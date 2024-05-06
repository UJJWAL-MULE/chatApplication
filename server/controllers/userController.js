const userModel = require('../model/userModel.js')
const  bcrypt = require('bcrypt')

const register = async(req, res, next)=>{
try {

  const { username, email, password } = req.body;
  const usernameCheck = await userModel.findOne({ username });
  if (usernameCheck)
    return res.json({ msg: "Username already used", status: false });
  const emailCheck = await userModel.findOne({ email });
  if (emailCheck)
    return res.json({ msg: "Email already used", status: false });
  console.log(1)
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    email,
    username,
    password: hashedPassword,
  });

  delete user.password;
  return res.json({ status: true, user });

} catch (error) {
  res.status(500).send(
    {status:false,
    mes: "internal server error"}
  )
}
}


const Login = async(req, res, next)=>{
  try {
    const { username,  password } = req.body;
    console.log(username )
    const user = await userModel.findOne({username});
    console.log(user)
    if (!username)
      return res.json({ msg: "username and passwor id required", status: false });
    const isPassValid = await bcrypt.compare(password,user.password)
    if (!isPassValid)
      return res.json({ msg: "username and passwor id required", status: false });
    console.log(1)
    delete user.password;
    return res.json({ status: true, user });
  
  } catch (error) {
    res.status(500).send(
      {status:false,
      mes: "internal server error"}
    )
  }
  }


const SetAvatar =async(req,res , next)=>{
try {
  const userId = req.params.id;
  console.log(userId)
  const avatarImage = req.body.image;
  console.log("before update")
  const userData = await userModel.findByIdAndUpdate(
    userId,
    {
      isAvatarImageSet: true,
      avatarImage,
    },
    { new: true }
  );

  console.log("after update")

  return res.status(200).json({
    isSet: userData.isAvatarImageSet,
    image: userData.avatarImage,
  });
  
} catch (error) {
  res.status(500).json(
    {status:false,
    mes: "internal server error"}
  )
}
 

} 


const getAllUser =async(req,res , next)=>{

  try {
    const users = await userModel.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    res.status(500).json(
      {status:false,
      mes: "internal server error"}
    )
  }
};





module.exports = {register , Login , SetAvatar , getAllUser}