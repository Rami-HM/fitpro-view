import React, { useState, useEffect } from "react";
import { AvatarGroup } from "gestalt";
import ProjectMemberPopover from "./ProjectMemberPopover";
import { useSelector } from "react-redux";

function ProjectMember(props) {

  const [isProjectMember, setIsProjectMember] = useState(false);
  const anchorRef = React.useRef(null);
  const project = useSelector((state) => state.project.project);

  useEffect(() => {
    setIsProjectMember(false);

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
        collaborators={project.project_assign || []}
      />
      {isProjectMember ? (
        <ProjectMemberPopover
          anchorRef={anchorRef}
          onDismiss = {onDismiss}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ProjectMember;
