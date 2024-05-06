const host ='https://chat-application-six-nu.vercel.app'

const RegisterRoute = `${host}/api/auth/register`

const LoginRoute = `${host}/api/auth/login`;

const AvatarRoute = `${host}/api/auth/setavatar`;

const AlluserRoute = `${host}/api/auth/allusers`;

const AddmessRoute  =`${host}/api/message/addmessage`;



const getAllMessageRoute =`${host}/api/message/getallmessage`;




export { RegisterRoute ,LoginRoute ,AvatarRoute , AlluserRoute , AddmessRoute ,getAllMessageRoute ,host }
