import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import socket from "../../server";
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";
import './InsertPageStyle.css'

const InsertPage = () => {

    const navigate = useNavigate();

    const login = () => {
        navigate("/");
    };

    const [user, setUser] = useState({
        name: '',
        id: '',
        pw: '',
        phone: ''
    });

    let Change = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const sendUser = (event) => {
        console.log("sendUser");
        event.preventDefault();
        // socket.emit("sendUser", user.name, user.id, user.pw, user.phone, (res) => {
        //     if (!res.ok) {
        //         console.log("error message", res.error);
        //     }
        //     console.log("전송", res);
        // });

        socket.emit("sendUser", user, (res) => {
            if (!res.ok) {
                console.log("error message", res.error);
            }
            console.log("전송", res);
        });
    };

    return (
        <div className='insert'>
            <form onSubmit={sendUser} className="insert-container">
                <h1>JOIN</h1>
                <Input
                    placeholder="NAME"
                    name="name"
                    value={user.name}
                    onChange={Change}
                    multiline={false}
                    rows={1}
                />
                <Input
                    placeholder="ID"
                    name="id"
                    value={user.id}
                    onChange={Change}
                    multiline={false}
                    rows={1}
                />
                <Input
                    placeholder="PW"
                    name="pw"
                    value={user.pw}
                    onChange={Change}
                    multiline={false}
                    rows={1}
                />
                <Input
                    placeholder="PHONE"
                    name="phone"
                    value={user.phone}
                    onChange={Change}
                    multiline={false}
                    rows={1}
                />

                <Button
                    // disabled={user.name === "" || user.id === "" || user.pw === "" || user.phone === ""}
                    disabled={user === ""}
                    type="submit"
                    className="send-button"
                >
                    전송
                </Button>

                <Button onClick={login} className='Insert-button'>
                    로그인
                </Button>
            </form>
        </div>
    )
}

export default InsertPage