import React, { useEffect, useState, useRef} from "react";
import { Box, Button, Heading, TextField } from "gestalt";
import TextEditor from "./TextEditor";
import axios from "../../config/axios/axios";
import {
  resetValiFields,
  getFailValidationList,
  handleValidation,
} from "../../actions/validation/validation";
import { useSelector } from "react-redux";

//redux
import { useDispatch } from "react-redux";
import { actionCreators as projectAction } from "../../redux/modules/project";

function ProjectForm(props) {
  const { mode, onDismiss } = props;
  const [failValidationList, setFailValidationList] = useState([]);

  const userSession = useSelector(state => state.member.member);
  const project = useSelector(state => state.project.project);

  const dispatch = useDispatch();


  //TextEditor
  const [contents, setContents] = useState("");
  const [projectInfo, setProjectInfo] = useState({
    prj_title: "",
    prj_sub_title: "",
    prj_contents: "",
    prj_start: "",
    prj_end: "",
    reg_mem_idx: "",
  });

  const scrollRef = useRef(null); // 스크롤 생성으로 인해 유효성에 걸리는 태그가 보이지 않으므로 최상단으로 올리기 위함

  useEffect(() => {
    if (failValidationList.length !== 0) {
      setTimeout(() => {
        setFailValidationList([]);
      }, 1500);
    }
  }, [failValidationList]);

  const resetForm = () => {
    setProjectInfo({
      prj_title: "",
      prj_sub_title: "",
      prj_contents: "",
      prj_start: "",
      prj_end: "",
      reg_mem_idx: "",
    });
    resetValiFields();
    setFailValidationList([]);
  };

  const handleChange = (field) => (e) => {
    const value = e.value;

    setProjectInfo((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const registeProject = async () => {
    const list = getFailValidationList();

    if (list.length !== 0) {
      scrollRef.current.scrollIntoView();
      setFailValidationList(list);
      return;
    }

    insertProjectAPI();
  };

  const insertProjectAPI = async () =>{
    const data = await {
      ...projectInfo,
      prj_contents: contents,
      prj_start: new Date(projectInfo.prj_start),
      prj_end: new Date(projectInfo.prj_end),
      reg_mem_idx : userSession.mem_idx
    };
    
    await axios({
      method: "POST",
      url: "/project/register",
      data
    }).then((res) => {
      let msg = res.data.error ? res.data.error : res.data.message;
      alert(msg);
      if (!res.data.error) {
        dispatch(projectAction.addProjectList(res.data.data));
        onDismiss();
      }
    });
  }

  const modifyProject = async () =>{
    const data = await {
      ...projectInfo,
      prj_contents: contents,
      prj_start: new Date(projectInfo.prj_start),
      prj_end: new Date(projectInfo.prj_end),
      upt_date: new Date(),
      upt_mem_idx : userSession.mem_idx
    };
    
    await axios({
      method: "PATCH",
      url: "/project/modify/"+project.prj_idx,
      data
    }).then((res) => {
      let msg = res.data.error ? res.data.error : res.data.message;
      alert(msg);
      if (!res.data.error) {
        const newProject = res.data.data;
        
        dispatch(projectAction.setProject(newProject));
        dispatch(projectAction.modifyProjectList(newProject));

        onDismiss();
      }
    });
  }

  useEffect(() => {
    if(mode === 'Insert')
      resetForm();
    else{
      setProjectInfo(project);
      resetValiFields();
      setFailValidationList([]);
      setContents(project.prj_contents);
    }
  }, []);

  return (
    <Box
      display="flex"
      marginStart={-3}
      marginEnd={-3}
      marginBottom={-3}
      marginTop={-3}
      wrap
      width="100%"
      direction="column"
      ref = {scrollRef}
    >
      <Box flex="grow" paddingX={3} paddingY={3}>
        <div
          className={
            failValidationList.includes("title") ? "shake-horizontal" : ""
          }
        >
          <TextField
            label="프로젝트 명"
            id="title"
            value={projectInfo.prj_title}
            onChange={handleChange("prj_title")}
            placeholder="프로젝트 명을 입력하세요"
            errorMessage={handleValidation(
              projectInfo,
              "title",
              "prj_title",
              true
            )}
          />
        </div>
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3}>
        <div
          className={
            failValidationList.includes("sub_title") ? "shake-horizontal" : ""
          }
        >
          <TextField
            label="프로젝트 서브명"
            id="subTitle"
            value={projectInfo.prj_sub_title}
            onChange={handleChange("prj_sub_title")}
            placeholder="설명을 입력하세요"
            errorMessage={handleValidation(
              projectInfo,
              "sub_title",
              "prj_sub_title",
              true
            )}
          />
        </div>
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3}>
        <Box
          display="flex"
          wrap
          marginStart={-3}
          marginEnd={-3}
          marginBottom={-3}
          marginTop={-3}
        >
          <Box flex="grow" paddingX={3} paddingY={3}>
            <TextField
              label="시작일"
              id="startDate"
              type="date"
              value={projectInfo.prj_start}
              onChange={handleChange("prj_start")}
              placeholder="Placeholder"
            />
          </Box>

          <Box flex="grow" paddingX={3} paddingY={3}>
            <TextField
              label="종료일"
              id="endDate"
              type="date"
              value={projectInfo.prj_end}
              onChange={handleChange("prj_end")}
              placeholder="Placeholder"
            />
          </Box>
        </Box>
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3} minHeight={300}>
        <TextEditor setContents={setContents} contents={contents} />
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3}>
        <Box
          justifyContent="end"
          marginStart={-1}
          marginEnd={-1}
          marginTop={-1}
          marginBottom={-1}
          display="flex"
          wrap
        >
          <Box paddingX={1} paddingY={1}>
            <Button text="Cancel" size="lg" onClick ={onDismiss} />
          </Box>
          <Box paddingX={1} paddingY={1}>
            <Button text="Submit" color="red" size="lg" onClick = {mode === "Modify" ? modifyProject : registeProject} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectForm;
