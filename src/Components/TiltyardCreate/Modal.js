import React from 'react'
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Modal(props) {
    
  return (
    
    <div className=''>
        {props.showModal &&
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress color='primary' variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body3" color="white">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
        </Box>
        }
    </div>
  );
}

Modal.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};
export default Modal