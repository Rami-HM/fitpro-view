import React from "react";
import { useState } from "react";
import { PageHeader, Sticky, Divider, Flex } from "gestalt";

import ProjectMoreBtn from "../../component/project/ProjectMore";
import ProjectMember from "../../component/project/ProjectMember";
import { useSelector } from "react-redux";

function ProjectHeader(props) {
  const [open, setOpen] = useState(false);

  const project = useSelector((state) => state.project.project);
  const userSession = useSelector((state) => state.member.member);

  return (
    <Sticky top={0}>
      <PageHeader
        title={project.prj_title}
        subtext={project.prj_sub_title}
        primaryAction={
          <Flex gap={3}>
            <ProjectMember />
            {project.readeridx === userSession.mem_idx ? (
              <ProjectMoreBtn
                open={open}
                setOpen={setOpen}
              />
            ) : (
              <></>
            )}
          </Flex>
        }
      />
      <Divider />
    </Sticky>
  );
}

export default ProjectHeader;
