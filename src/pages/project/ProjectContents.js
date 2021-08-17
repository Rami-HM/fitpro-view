import React, { useEffect, useRef, useState } from "react";
import "../../resource/css/markdown.css";
import ProjectSheet from "./ProjectSheet";
import ProjectHeader from "./ProjectHeader";
import { useSelector } from "react-redux";
import { Viewer } from "@toast-ui/react-editor";

function ProjectContents(props) {
  const [isModal, setIsModal] = useState(false);

  const project = useSelector((state) => state.project.project);
  const contentsRef = useRef();

  const onDismiss = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (contentsRef.current != null)
      contentsRef.current.getInstance().setMarkdown(project.prj_contents);
  }, [project]);

  useEffect(() => {
    return () => {
      onDismiss();
    };
  }, []);

  return (
    <>
      {isModal ? (
        <ProjectSheet onDismiss={()=>setIsModal(false)} mode={"Modify"} />
      ) : (
        <>
          <ProjectHeader
            setIsModal={setIsModal}
          />

          <div className="markdown-body">
            <Viewer ref={contentsRef} initialValue={project.prj_contents} />
          </div>
        </>
      )}
    </>
  );
}

export default ProjectContents;
