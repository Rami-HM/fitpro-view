import React, { useState, useEffect } from "react";
import { AvatarGroup } from "gestalt";
import ProjectMemberPopover from "./ProjectMemberPopover";

function ProjectMember(props) {
  const { projectId, setIsProjectMember, isProjectMember } = props;
  const anchorRef = React.useRef(null);
  const [assignProjectMemberList, setAssignProjectMemberList] = useState([]); //프로젝트 내 할당 된 사용자

  useEffect(() => {
    getAssignProjectMemberListAPI();
    setIsProjectMember(false);

  }, [projectId]);

  const onDismiss = () => {
    setIsProjectMember(!isProjectMember);
  };

  const getAssignProjectMemberListAPI = async () => {
    setTimeout(() => {
      const projectMemberList = [
        {
          idx: "1",
          name: "name1",
          src: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
          projectManager: "true"
        },
        {
          idx: "3",
          name: "name3",
          src: "https://i.ibb.co/7tGKGvb/shanice.jpg",
          projectManager: "false"
        },
        {
          idx: "6",
          name: "name6",
          src: "https://i.ibb.co/7tGKGvb/shanice.jpg",
          projectManager: "false"
        },
      ];

      setAssignProjectMemberList(projectMemberList);
    }, 10);
  };

  return (
    <>
      <AvatarGroup
        accessibilityLabel="Click to see group collaborators."
        role="button"
        onClick={() => onDismiss()}
        ref={anchorRef}
        size="md"
        collaborators={assignProjectMemberList}
      />
      {isProjectMember ? (
        <ProjectMemberPopover
          anchorRef={anchorRef}
          assignProjectMemberList={assignProjectMemberList}
          setAssignProjectMemberList={setAssignProjectMemberList}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ProjectMember;
