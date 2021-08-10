import React,{useState, useEffect} from 'react';
import DashboardContents from './DashboardContents';
import { Box } from "gestalt";
import ProjectInfo from "../../component/dashboard/ProjectInfo";

function DashboardTitle() {
    
    const [project,setProject] = useState({
        id : 0,
        title : 'No data',
        subTitle : 'No data',
        progress : 0,
        startDate : "0001-01-01",
        endDate : '9999-12-31'
    });

    useEffect(()=>{
      console.log("dashboard ---- ")
      console.log(project);
    },[project]);

    return (
        <>
        <Box column={12} marginBottom={5}>
            <ProjectInfo setProject = {setProject} project={project}/>
        </Box>
            <DashboardContents project={project} />
        </>
    )
}

export default DashboardTitle
