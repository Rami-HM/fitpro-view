import React, {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}  >
        <LinearProgress className ="hgt-20px" height={10} color="primary" variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};


function Progress(props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      
      if(progress >= 80){
        clearInterval(timer);
      }else
        setProgress((prevProgress) => (prevProgress + 5));

    }, 70);
    return () => {
      clearInterval(timer);
    };
  }, [progress,{...props}]);

  return (
    <div style={{"width":"100%"}}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
}
export default Progress;