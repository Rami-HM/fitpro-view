import React, { useEffect, useState } from "react";
import { Box, Datapoint } from "gestalt";
import { useSelector } from "react-redux";
import StatusComp from "../common/StatusComp";

function DashBoardInfo() {
    const project = useSelector((state) => state.project.project);
    const [lastDay, setLastDay] = useState("0");
  
    useEffect(() => {
      if (project.hasOwnProperty("prj_idx")) {
        let dDay =
          (new Date(project.prj_end).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24);
        if (dDay < 0) dDay = 0;
        setLastDay(Math.round(dDay));
      }
    }, [project]);
    return (
        <>
        <Datapoint
            size="md"
            title={`${project.prj_start} ~ ${project.prj_end}`}
            value={
              <>
                <Box display="flex">
                  {`${lastDay}Day `}
                  <Box paddingX={5}>
                    <StatusComp />
                  </Box>
                </Box>
              </>
            }
          />
        </>
    )
}

export default DashBoardInfo
