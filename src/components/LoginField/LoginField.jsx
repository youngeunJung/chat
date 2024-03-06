import React from 'react'
import {useNavigate} from "react-router-dom"
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button"
import './LoginField.css'
const LoginField = ({ id, pw, onChangeID, onChangePW, login }) => {

    const navigate = useNavigate();

    const insert = () => {
        // socket.emit("leaveRoom", id, (res) => {
        //     if (res.ok) navigate("/") // 다시 채팅방 리스트 페이지로 돌아감
        // })
        navigate("/insert")
    };

    return (
        <div className="Login">
            <form onSubmit={login} className="Login-container">
                <Input
                    placeholder="ID"
                    value={id}
                    onChange={(event) => onChangeID(event.target.value)}
                    multiline={false}
                    rows={1}
                />

                <Input
                    placeholder="PW"
                    value={pw}
                    onChange={(event) => onChangePW(event.target.value)}
                    multiline={false}
                    rows={1}
                />

                <Button
                    disabled={id === "" || pw === ""}
                    onClick = {login}
                    type="submit"
                    className="send-button"
                >
                    전송
                </Button>

                <Button onClick={insert} className='Insert-button'>
                    회원가입
                </Button>
            </form>
        </div>
    )
}

export default LoginField