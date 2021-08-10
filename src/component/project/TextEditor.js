import React, { useRef, useEffect } from "react";
// TOAST UI Editor import
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { SERVER_URL } from "../../config/constants/commonConts";
import axios from "../../config/axios/axios";

function TextEditor(props) {
  const { setContents } = props;
  const editorRef = useRef();

  //이미지를 자동으로 base64로 변환을
  //서버에 파일 저장 후 url로 리턴 으로 변경
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async () => {
            let formData = new FormData();
            formData.append("file", blob);

            axios({
              method: "POST",
              url: "/api/upload",
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then((res) => {
              console.log(res.data.data.files);
              callback(`${SERVER_URL}` + res.data.data.files[0], blob.name);
            });
          })();

          return false;
        });
    }

    return () => {};
  }, [editorRef]);

  return (
    <>
      <Editor
        usageStatistics={false}
        initialValue=""
        previewStyle="tab"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() => {
          const innerTxt = editorRef.current.getInstance().getHTML();
          setContents(innerTxt);
        }}
        ref={editorRef}
      />
    </>
  );
}

export default TextEditor;
