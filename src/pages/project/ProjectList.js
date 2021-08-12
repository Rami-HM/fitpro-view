import React, { useEffect, useState } from "react";
import { Text, Table, Box } from "gestalt";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
function ProjectList(props) {
  
  const { projectId, setProjectId } = props;
  const [projectInfo, setProjectInfo] = useState([]);

  const changeProjectContents = (id) => {
    setProjectId(id);
  };

  useEffect(()=>{
    projectListAPI();
  },[]);

  const projectListAPI = () => {
    setTimeout(() => {
      setProjectInfo([
        {
          bookmark : true,
          projectId: "1",
          projectName: "projectName1",
        },
        {
          bookmark : false,
          projectId: "2",
          projectName: "projectName2",
        },
        {
          bookmark : false,
          projectId: "3",
          projectName: "projectName3",
        },
        {
          bookmark : false,
          projectId: "4",
          projectName: "projectName4",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <Table>
        <Table.Header></Table.Header>
        <Table.Body>
          {
            projectInfo.map((item)=>{
              return(
                <Table.Row key = {item.projectId}>
                <Table.Cell>
                  <Box width={50}>
                    {item.bookmark ? <StarIcon style={{ color: "orange" }}/> : <StarOutlineIcon style={{ color: "gray" }} />}
                  </Box>
                </Table.Cell>
                <Table.Cell>
                <Text onClick={() => changeProjectContents(item.projectId)}>{item.projectName}</Text>
                </Table.Cell>
              </Table.Row>
              );
            })
          }
        </Table.Body>
      </Table>
    </>
  );
}

export default ProjectList;
