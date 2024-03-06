import React, { Component, useEffect, useState } from 'react';
// import Myslide from './Myslide';
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/base/Button"
import styled from "styled-components";
import data from "./data";
import './MainPageStyle.css';
import socket from '../../server';
// import { Container } from '@mui/joy';

// export default class Mainpage extends Component {
// render(){
const Mainpage = () => {

    const [galleryList, setgalleryList] = useState([]);
    const [userid, setuserid] = useState("");
    // var userid = ""

    const navigate = useNavigate();

    const writepage = () => {
        navigate("/Writepage")
        socket.emit("writeId", userid);
    };

    useEffect(() => {
        socket.on("galleryList", (res) => {       //배열리스트가 res로 들어와야함.
            console.log("_________________", res);
            if(res !== null){
                setgalleryList((prevState) => prevState.concat(res));
            }
        })

        socket.on("loginUserId", (res) => {
            console.log("loginID", res);
            setuserid(res);
            //userid = res; 이건 안되네 왜지?
        })
    });

    const [slideIndex, setSlideIndex] = useState(1);

    const moveToPrevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex((prev) => prev - 1);
        } else {
            setSlideIndex(data.length);     //다시 마지막 배열로 넘어감
        }
    };

    const moveToNextSlied = () => {
        if (slideIndex !== data.length) {
            setSlideIndex((prev) => prev + 1);
        } else {
            setSlideIndex(1);       //다시 1번 이미지로 넘어감
        }
    };

    const moveDot = (index) => {
        setSlideIndex(index);
    }


    return (
        // <div>
        //     <h1>
        //         Swiper JS
        //     </h1>
        //     <Myslide></Myslide>
        // </div>

        <div className='main'>
            <h6>{userid}</h6>
            <Button>
                로그아웃
            </Button>
            <h1>Gallery</h1>
            {/* <> */}
            {galleryList.map((item) => (
                <div key={item[0].num}>
                    <table>
                        <tr>
                            <td>{item[0].num}</td>
                            <td>{item[0].id}</td>
                            <td>{item[0].title}</td>
                            {/* <td>{item.content}</td> */}
                            <td>{item[1].date}</td>
                            {/* <td>{item.updatedate}</td> */}
                        </tr>
                        <tr className='slide'>
                            <td colspan='5'>
                                <div className='maincontainer'>
                                    <button direction="prev" onClick={moveToPrevSlide} className='arrowprev'>
                                        이전
                                    </button>
                                    {data.map((character) => (
                                        <Slide
                                            key={character.id}
                                            className={character.id === slideIndex ? "active" : null}
                                        >
                                            <img src={process.env.PUBLIC_URL + `/image/심바/${character.img}`} />
                                            {/* <div>{character.name}</div>
                                            <div>{character.nickname}</div> */}
                                        </Slide>
                                    ))}
                                    <button direction="next" onClick={moveToNextSlied} className='arrownext'>
                                        다음
                                    </button >
                                    <div className='dotcontainer'>
                                        {data.map((character) => (
                                            <Dot
                                                key={character.id}
                                                className={character.id === slideIndex ? "active" : null}
                                                onClick={() => moveDot(character.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            ))}    {/* 여러개 tag 생성가능함*/}
            {/* </> */}
            <Button onClick = {writepage} >
                글쓰기
            </Button>
        </div>
    )
}

//     }
// }

export default Mainpage;

const Slide = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  &.active {
    opacity: 1;
  }
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: pink;
  cursor: pointer;
  &.active {
    background-color: skyblue;
  }
`