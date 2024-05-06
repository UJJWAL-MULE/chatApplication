import React from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useState,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {AlluserRoute , host} from  '../utils/ApiRoutes.js';
import Contacts from '../components/Contacts.jsx';
import Welcome from '../components/Welcome.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import {io} from 'socket.io-client'

const Chat = () => {

  const socket  = useRef()

  const [contacts,setContacts]=useState([]) 

  // stores data of user who is sending data to sonme user we take that data from local storage
  const [currentUser,setCurrentUser]=useState(undefined)

  //  stores data of user with whom you are going to chat and its data comes from contact components     i.e receiver
  const navigate = useNavigate()  
  const [currentChat,setCurrentChat] = useState(undefined)   

  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
    }
    else{
      setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')))
    }
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current =io(host)
      socket.current.emit("add-user" ,currentUser._id)
    }

  },[currentUser])

  useEffect(()=>{
    const get_data = async()=>{
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const allData = await axios.get(`${AlluserRoute}/${currentUser._id}`)
          console.log(allData.data)
          setContacts(allData.data)
        }
        else {
          navigate('/setavatar')
        }
      }
    }
    get_data()
  },[currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
   <>
   <Container>
    <div className="container">
      <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
      { 
      currentChat=== undefined ?
      <Welcome   currentUser={currentUser}  /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
      }
      
    </div>
   </Container>

   </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat
