
const  messsageModel  = require('../model/messsageModel.js')


const addMessage= async (req, res ,next)=>{

  try {
    const { from ,to , message } =req.body
       console.log(1)

    const data = await messsageModel.create({
      message: { text : message},
      users:[to ,from],
      sender: from
    })
    
    console.log(2)
    if(data){
      res.json({message:"data has been added"})
    }
    else{
      res.json({message:"data has not been added in database"})
    }

  } catch (error) {
    
    res.status(500).json(
      {status:false,
      mes: "internal server error"}
    )

  }

}

const getAllMessage= async(req, res , next)=>{
  try {

    const {to , from} = req.body

   const messages = await messsageModel.find({
    users: {
      $all: [from, to],
    },
  }).sort({ updatedAt: 1 });

  

  
  const projectMessage = messages.map((msg)=>{
                      return {
                        fromSelf: msg.sender.toString() === from,
                        message: msg.message.text,
                      }  })

    console.log(projectMessage)
   res.json(projectMessage)
    
  } catch (error) {
    res.status(500).json(
      {status:false,
      mes: "internal server error",
      error:error
    }
    )

  }

}

module.exports ={addMessage ,getAllMessage}