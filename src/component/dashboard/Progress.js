import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          className="hgt-20px"
          height={10}
          color="primary"
          variant="determinate"
          {...props}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round( props.value )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

function Progress(props) {
  const [progress, setProgress] = useState(0);
  const [percent, setPercent] = useState(0);

  const project = useSelector((state) => state.project.project);

  useEffect(() => {
    setProgress(0);
    if (project.hasOwnProperty("prj_idx")) {
      const totaldate =
        (new Date(project.prj_end).getTime() -
          new Date(project.prj_start).getTime()) /
        (1000 * 60 * 60 * 24);
      const pasDay =
        (new Date().getTime() - new Date(project.prj_start).getTime()) /
        (1000 * 60 * 60 * 24);
      const percentDate = (Math.round(pasDay) / Math.round(totaldate)) * 100;
      console.log(percentDate < 0);
      setPercent(percentDate < 0 ? 0 : percentDate);
    }
  }, [project]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof percent === "number") {
        if (progress >= percent || progress === 100) {
          clearInterval(timer);
        } else setProgress((prevProgress) => prevProgress + 5);
      }
    }, 70);
    return () => {
      clearInterval(timer);
    };
  }, [progress, { ...props }]);

  return (
    <div style={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
}
export default Progress;
