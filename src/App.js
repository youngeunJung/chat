import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server";
// import InputField from "./components/InputField/InputField";
// import MessageContainer from "./components/MessageContainer/MessageContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RoomListPage from "../pages/RoomListPage/RoomListPage";
// import ChatPage from "../pages/Chatpage/Chatpage";
import LoginPage from "./pages/LoginPage/LoginPage";
import InsertPage from "./pages/InsertPage/InsertPage"; 
import Mainpage from "./pages/Mainpage/Mainpage";
import Writepage from "./pages/Writepage/Writepage"; 

function App() {

  // const [rooms, setRooms] = useState([]);
  // // console.log("----------", user); 
  // // console.log("message List: " , messageList);
  // console.log("rooms", rooms);

  // useEffect(() => {  //창이 뜨자마자 실행하게 해줌
  //   socket.on("rooms", (res) => {
  //     setRooms(res);
  //   });
  
  //   askUserName();
  
  return ( 
    <BrowserRouter>
       <Routes>
          <Route exact path="/" element={<LoginPage/>} />
           {/* <Route exact path="/room" element={<RoomListPage rooms={rooms} />} /> */}
           {/* <Route exact path="/room/:id" element={<ChatPage user={user} />} /> */}
           <Route exact path="/insert" element={<InsertPage/>} />
           <Route exact path="/Mainpage" element={<Mainpage/>} />
           <Route exact path="/Writepage" element={<Writepage/>} />
       </Routes>
    </BrowserRouter> 

    // <div>
    //   <div className="App">
    //     <MessageContainer 
    //       messageList = {messageList}
    //       user = {user}
    //     />
    //     <InputField 
    //       message={message} 
    //       setMessage={setMessage}
    //       sendMessage={sendMessage}
    //     />
    //   </div>
    // </div>
  );
};

export default App;
