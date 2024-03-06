import React, { useEffect, useState } from 'react'
import {useLocation, useParams, useNavigate} from "react-router-dom"
import socket from "../../server";
import { Button } from "@mui/base/Button"
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import InputField from "../../components/InputField/InputField";
import './chatPageStyle.css'

const ChatPage = ({user}) => {
    // const location = useLocation();   //현재 url을 가져옴(/뒤에 모든 url을 unicode로 가져옴!!)
    const {id} = useParams();        //user가 조인한 방의 아이디를 url에서 가져온다.(필요한 정보만 가져올 수 있음!!)
    const navigate = useNavigate();

    const leaveRoom=()=>{
      socket.emit("leaveRoom", id, (res)=>{
          if(res.ok) navigate("/") // 다시 채팅방 리스트 페이지로 돌아감
      })
    };

    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");
    
    useEffect(() => {

      // console.log(location.pathname);
      // console.log("url address:::::::::", id)

      socket.on("message", (res) => {
        console.log("message", res)
        setMessageList((prevState) => prevState.concat(res));
      });     //backend에서 전달하는 message를 화면에 출력  

      socket.emit("joinRoom", id, (res) => {
        if(res && res.ok){
          console.log("successfully join:", res)
        }else{
          console.log("fail to join:", res)
        }
      })
    }, []);
    // }, [location]);  useLocation을 사용할 경우!!!
  
    const sendMessage = (event) => {
      console.log("ininininin");
      event.preventDefault();         //page 재시작을 막아줌
      // const encoded = decodeURI(location.pathname);   //유니코드를 한글로 변환해줌
      // const encodedSplit = encoded.split('/');
      socket.emit("sendMessage", id, message, (res) => {  //방 정보도 보내줘야됨
        if (!res.ok) {
          console.log("error message", res.error);
        }
        setMessage("");
      });
    };

    return (
      <div>
        <div className="App">
          <nav>
            <Button onClick={leaveRoom} className='back-button'>←</Button>
            <div className='nav-user'>{user.name}</div>
            <Button>                
              <img
                  src="../hambugermenu.png"
                  // className="profile-image"
                  style={{width: '20px'}}
                />
              </Button>
          </nav>
          <div>
            {messageList.length > 0 ? (
              <MessageContainer messageList={messageList} user={user} />
            ) : null}
          </div>
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    );
}

export default ChatPage
