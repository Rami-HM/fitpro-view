import React, { useEffect, useState } from "react";
import {
  PageHeader,
  Sticky,
  Divider,
  Flex,
} from "gestalt";
import ReactMarkdown from "react-markdown";
import "../../resource/css/markdown.css";
import ProjectSheet from "./ProjectSheet";
import {
  DELETE_TITLE,
  DELETE_CONTENTS,
} from "../../config/constants/commonConts";
import Confirm from "../../component/common/Confirm";
import ProjectMoreBtn from '../../component/project/ProjectMore';
import ProjectMember from '../../component/project/ProjectMember';


function ProjectContents(props) {
  const condata = `## 마크다운
으로 저자ㅏㅇ된
데이터
화면에다가
뿌리기
> 해야하는중!!!!!!!!!
1. 일
2. 이
3. 삼
4. 사

![[FITPRO] Login.png](http://127.0.0.1/uploads/20210808/2fe4ce4e-022a-4a13-90ef-d43ce1023798.png)

|  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  | 표 |
`;
  const { projectId } = props;

  const [open, setOpen] = React.useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [isProjectMember, setIsProjectMember] = useState(false);

  const onDismiss = () => {
    setIsModal(false);
    setOpen(false);
    setIsDeleteConfirm(false);
    setIsProjectMember(false);
  };

  const [projectContents, setProjectContents] = useState({
    projectId: projectId,
    projectName: "",
    contents: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setProjectContents({
        projectId: projectId,
        projectName: "",
        contents: condata,
        startDate: "",
        endDate: "",
      });
    }, 1000);
  }, [projectId]);

  

  return (
    <>
      {isDeleteConfirm ? (
        <Confirm
          onDismiss={onDismiss}
          title={DELETE_TITLE}
          contents={DELETE_CONTENTS}
        />
      ) : (
        ""
      )}
      {isModal ? (
        <ProjectSheet projectId = {projectId} onDismiss={onDismiss} mode={"Modify"} />
      ) : (
        <>
          <Sticky top={0}>
            <PageHeader
              title="Kitchen Reno Ideas"
              subtext="subtitle"
              primaryAction={
                <Flex gap={3}>
                    <ProjectMember isProjectMember = {isProjectMember} setIsProjectMember = {setIsProjectMember} projectId = {projectId}/> 
                    {/* 팀장일경우 */}
                    <ProjectMoreBtn projectId = {projectId} open = {open}  setOpen = {setOpen} setIsModal = {setIsModal} setIsDeleteConfirm = {setIsDeleteConfirm}/> 
                </Flex>
              }
            />
            <Divider />
          </Sticky>

          <div className="markdown-body">
            <ReactMarkdown children={projectContents.contents} />
          </div>
        </>
      )}
    </>
  );
}

export default ProjectContents;
