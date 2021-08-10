import React, { useState } from "react";
import ImageUploader from "react-images-upload";
// import axios from "../config/axios/axios";
import axios from "axios";
import { Button } from "gestalt";

function Upload() {
  const [pictures, setPictures] = useState();

  const onDrop = async (picture) => {
    // 여기에 ajax를 넣을 수 있다.
    //await uploadImg(picture);

    setPictures(picture);

    console.log(picture);
  };

  const uploadImg = async() => {
    let formData = new FormData();
    
    pictures.forEach(element => {
      formData.append("file", element);
    });
    debugger;
    await axios({
      method: "POST",
      url: "http://localhost/api/upload",
      data: formData,
      //headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      console.log(formData);
      console.log(res);
    });
  };

  return (
    <>
      <ImageUploader
        withIcon={true}
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
        withPreview={true}
        singleImage={true}
      />
      <Button inline color="blue" text="sand" onClick={uploadImg} />
    </>
  );
}

export default Upload;
