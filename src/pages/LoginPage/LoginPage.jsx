import React, { useEffect, useState } from 'react'
import socket from "../../server"
import LoginField from "../../components/LoginField/LoginField";
import { useNavigate } from "react-router-dom"
import './LoginPageStyle.css'

const LoginPage = () => {

  const navigate = useNavigate();

  useEffect (() => {
    socket.on("loginInfo", (res) => {
      console.log("++++++++++++", res);

      if (res[0] === "ok") {
        navigate("/Mainpage");
        socket.emit("sendUserInfo", res[1].id);
      } else if (res[0] === "false") {
        // if(doubleSubmitCheck()) return;
        alert("로그인에 실패하였습니다");
        onChangeID("");
        onChangePW("");
      } else {
        // if(doubleSubmitCheck()) return;
        alert("회원가입 해주세요");
        onChangeID("");
        onChangePW("");
      }
    });
  },[]);

  // const [user, setUser] = useState(null);

  // const askUserName = () => {
  //     const userName = prompt("당신의 이름을 입력하세요")
  //     console.log("uuu", userName);

  //     socket.emit("login", userName, (res) => {    //call back 함수 = 잘 처리가 되었는지 확인할 수 있게 해주는 함수(back-end에 userName을 잘 넘겨주었으면 front-end console 창에서 cb함수 실행)
  //       console.log("res", res);                   //emit = 말할 때!!!(userName을 알려줌!!) / res = user 객체를 반환해줌
  //       if(res?.ok){            
  //         setUser(res.data);                      //user 정보가 로그인할 때마다 바뀜
  //       }
  //     });
  // };

  const [id, onChangeID] = useState("");
  const [pw, onChangePW] = useState("");

  // var doubleSubmitFlag = false;
  // function doubleSubmitCheck() {
  //   if(doubleSubmitFlag){
  //     return doubleSubmitFlag;
  //   }else {
  //     doubleSubmitFlag = true;
  //     return false;
  //   }
  // }

  const login = (event) => {
    console.log("Logininininin");
    event.preventDefault();
    socket.emit("login", id, pw, (res) => {  //방 정보도 보내줘야됨
      if (!res.ok) {
        console.log("error message", res.error);
      }
    });
  };

  return (
    <div>
      <div className="App">
        <LoginField
          id={id}
          pw={pw}
          onChangeID={onChangeID}
          onChangePW={onChangePW}
          login={login}
        />
      </div>
    </div>

  )
}

export default LoginPage
