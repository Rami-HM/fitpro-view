import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import axios from "../../config/axios/axios";
import { Button } from "gestalt";

function UploadSingle() {
  const [pictures, setPictures] = useState([]);

  const onDrop = async (picture) => {
    // 여기에 ajax를 넣을 수 있다.
    //await uploadImg(picture);
    setPictures(picture);

    //uploadImg(picture);
  };

  const uploadImg = async () => {
    let formData = new FormData();
    pictures.forEach((element) => {
      formData.append("file", element);
    });

    await axios({
      method: "POST",
      url: "/api/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      console.log(formData);
      console.log(res);
    });
  };

  return (
    <>
      <Button onClick={uploadImg}></Button>
      <ImageUploader
        withIcon={true}
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
        withPreview={true}
        singleImage={true}
      />
    </>
  );
}

export default UploadSingle;
