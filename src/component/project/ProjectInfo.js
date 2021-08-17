import React, { useEffect, useState } from "react";
import { Text, TapArea, Box } from "gestalt";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { useSelector } from "react-redux";
import axios from "../../config/axios/axios";
//redux
import { useDispatch } from "react-redux";
import { actionCreators as projectAction } from "../../redux/modules/project";

function ProjectList(props) {
  const { projectInfo, getProjectListAPI } = props;

  const userSession = useSelector((state) => state.member.member);
  const project = useSelector((state) => state.project.project);

  const dispatch = useDispatch();

  const projectDetailAPI = async(projectId) => {
    try {
      await axios({
        method: "GET",
        url: "/project/detail/" + projectId + "/" + userSession.mem_idx,
      }).then((res) => {
        const newProject = res.data;
        dispatch(projectAction.setProject(newProject));
        
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeProjectContents = async(idx) => {
    await projectDetailAPI(idx);
  };

  const modifyBookmark = async(bookmark,idx) =>{
    try {
      await axios({
        method: "PATCH",
        url: "/project/bookmark",
        data : {
          bookmark : bookmark,
          prj_idx : idx,
          mem_idx : userSession.mem_idx
        }
      }).then((res) => {
        dispatch(projectAction.modifyProjectList({
          ...project,
          bookmark: bookmark
        }));
        getProjectListAPI();
      });
    }catch(error){
      console.log(error);
    }
  }


  return (
    <div
      className={projectInfo.prj_idx === project.prj_idx ? "list-selected" : ""}
      key={projectInfo.prj_idx}
    >
      <Box rounding={4} marginBottom={5}>
        <div className={"ALa ho-"}>
          <Box alignItems="center" display="flex" padding={3}>
            <Box column={2}>
            <TapArea onTap={() => modifyBookmark(!projectInfo.bookmark, projectInfo.prj_idx)}>
              {projectInfo.bookmark ? (
                <StarIcon style={{ color: "orange" }} />
              ) : (
                <StarOutlineIcon style={{ color: "gray" }} />
              )}
              </TapArea>
            </Box>
            <TapArea
              rounding={4}
              onTap={() => changeProjectContents(projectInfo.prj_idx)}
            >
              <Box column={10} maxHeight = {50} overflow="scrollY">
                <Text weight="bold" >{projectInfo.prj_title}</Text>
              </Box>
              <Box column={10} marginTop = {1}>
                <Text size="sm">{projectInfo.prj_start} ~ {projectInfo.prj_end}</Text>
              </Box>
            </TapArea>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default ProjectList;
