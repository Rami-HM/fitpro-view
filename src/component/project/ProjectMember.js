import React, { useState, useEffect } from "react";
import { AvatarGroup } from "gestalt";
import ProjectMemberPopover from "./ProjectMemberPopover";
import { useSelector } from "react-redux";
import axios from "../../config/axios/axios";

function ProjectMember(props) {

  const [isProjectMember, setIsProjectMember] = useState(false);
  const [projectAssign, setProjectAssign] = useState([]);
  const anchorRef = React.useRef(null);
  
  const project = useSelector((state) => state.project.project);

  const getProjectAssignListAPI = () =>{
    axios({
      method:"GET",
      url : '/project/member/' + project.prj_idx 
    }).then((res)=>{
      setProjectAssign(res.data);
    })
  }

  useEffect(() => {
    setIsProjectMember(false);
    if(project.prj_idx != null)
      getProjectAssignListAPI();
  }, [project]);

  const onDismiss = () => {
    setIsProjectMember(!isProjectMember);
  };

  return (
    <>
      <AvatarGroup
        accessibilityLabel="Click to see group collaborators."
        role="button"
        onClick={() => onDismiss()}
        ref={anchorRef}
        size="md"
        collaborators={projectAssign || []}
      />
      {isProjectMember ? (
        <ProjectMemberPopover
          projectAssignList = {projectAssign}
          anchorRef={anchorRef}
          onDismiss = {onDismiss}
          setProjectAssign = {setProjectAssign}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ProjectMember;
