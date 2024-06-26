import React from "react";
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Chat/> } />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/chat' element={<Chat/>} />
      <Route path='/setavatar' element={<SetAvatar/>} />
      <Route path='/setavatar/:id' element={<Chat/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
