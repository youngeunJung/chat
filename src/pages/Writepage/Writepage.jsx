import { useState, useRef } from 'react';
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";
import socket from "../../server";
import './WritePageStyle.css';

const Writepage = () => {

    //출력되는 파일이름  & 서버로 보내지는 배열
    const [uploadList, setuploadList] = useState([]);
    console.log("======", uploadList);

    const onLoadFile = (e) => {      // 여러 파일 한꺼번에 넘기는거 안댐...ㅠㅠ
        e.preventDefault();
        const file = e.target.files[0];  //배열로 넘어옴
        console.log("________", e.target.files[0]);
        console.log("++++", file);
        console.log("name", file.name);
        setuploadList((prevState) => prevState.concat(file));
    }
    
    const deleteFile = (deleteFile) => {
        console.log("delete");
        console.log(":::::::::::::", deleteFile);
        setuploadList(uploadList.filter((upload) => upload.name !== deleteFile));
        // const uploadLi = document.getElementById('uploadLi');
        // const uploadText = document.getElementById('uploadText');
        // console.log("<><><><><><><><><>", uploadLi);
        // uploadLi.remove();

        // console.log("++++", uploadText.innerText);
        // const textResult = uploadText.innerText;
        
        // for(let i = 0; i < uploadList.length; i++){
        //     if(uploadList[i].name === textResult){
        //         uploadList.splice(i, 1);
        //         setuploadList(uploadList);
        //         console.log("<><><><><<>?????", uploadList);
        //     }
        // }

        // console.log("--------------", uploadList);
    }

    const [write, setWrite] = useState({
        title: '',
        contents: '',
    });

    let Change = (event) => {
        setWrite({ ...write, [event.target.name]: event.target.value });
    }

    // const [setupload, uploadChange] = useState("첨부파일");
    // const fileUpload = useRef(null);

    // console.log()

    // const upload = () => {

    //     console.log("+++++++++++");

    //     if(fileUpload.current.value !== ""){
    //         const fileName = fileUpload.current.value;
    //         uploadChange(fileName);
    //     }else{
    //         console.log("데이터가 없다");
    //     }

    //     console.log("------");
    //     // console.log(event.target.value);
    //     // uploadChange(event.target.value)
    // };

    const sendWrite = (event) => {
        event.preventDefault();   //submit을 방지한다.
        console.log("write");
       
        socket.emit("sendWrite", write, uploadList, (res) => {
            if (!res.ok) {
                console.log("error message", res.error);
            }
            console.log("전송", res);
        });
    };

    return (
        //  insertPage와 유사함(완료될 시 submit을 통해 mainpage로 이동)
        <div className="writeMain">
            <form action="/Mainpage" onSubmit={sendWrite} className='write'>
                <Input
                    placeholder="TITLE"
                    name="title"
                    value={write.title}
                    onChange={Change}
                    multiline={false}
                    rows={1}
                />
                {/* <input placeholder="title"/> */}
                <div className="filebox">
                    <div>
                        <label for="file">내 PC</label>
                        <input type="file" id="file" onChange={onLoadFile} multiple={true} />    {/* input이 onChange되면 배열로 받아야함*/}
                    </div>
                    <div className='uploadResult'>
                        <ul>
                            {uploadList.map((upload) => (
                                    <li key={upload.lastModified} id="uploadLi"> 

                                    {/* <li id="uploadLi"> */}
                                    <Button onClick={() => deleteFile(upload.name)} className='deleteButton'>
                                    🗙</Button>       {/* button 태그를 사용하면 form 태그도 같이 전송됨!! 왜?? */}
                                    <div id="uploadText">{upload.name}</div>
                                    </li>
                            ))}
                        </ul>
                    </div>
                    {/* <input className="upload-name" value = {setupload} disabled = "disabled"/>   함수로 파일명 변경 해보기 */}
                    {/* <label for="file">확인</label>
                    <input type="file" id="file" multiple/> */}
                    {/* <input type="file" ref={fileUpload} id="file" onchange={upload}/> */}
                </div>
                <Input
                    placeholder="CONTENTS"
                    name="contents"
                    value={write.contents}
                    onChange={Change}
                    multiline={true}
                    // rows={1}
                />
                {/* <textarea cols="100" placeholder="contents" /> */}
                {/* <button type="submit">전송</button> */}
                <input type='submit' value="전송" />
            </form>
        </div>
    )
}

export default Writepage;