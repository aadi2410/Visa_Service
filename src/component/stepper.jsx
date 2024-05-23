import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import VerifiedIcon from '@mui/icons-material/Verified';

const CustomStepper = styled(Stepper)({
  '& .MuiStepLabel-label': {
    textAlign: 'center'
  }
})

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgb(25 118 211) 0%, rgb(0 17 33) 50%, rgb(25 118 211) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgb(25 118 211) 0%, rgb(0 17 33) 50%, rgb(25 118 211) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => 
  {
    return (
  {
  backgroundColor:(!ownerState.verified&&ownerState.activeStep==3)?"red":theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active&& {
    backgroundImage:
    ownerState.activeStep!=3?'linear-gradient(136deg, rgb(25 118 211) 0%, rgb(0 17 33) 50%, rgb(25 118 211) 100%)': ownerState.activeStep==3&&ownerState.verified?'linear-gradient(136deg, rgb(25 118 211) 0%, rgb(0 17 33) 50%, rgb(25 118 211) 100%)':'none',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(136deg, rgb(25 118 211) 0%, rgb(0 17 33) 50%, rgb(25 118 211) 100%)',
  }),
})});

function ColorlibStepIcon(props) {
  const { active, completed, className ,verified,activeStep,label} = props;

  const icons = {
    1: <PlayCircleOutlineIcon />,
    2: <AssignmentIcon />,
    3: <HourglassBottomIcon />,
    4:  <VerifiedIcon  />, // Use a different icon if not verified
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active,verified,activeStep,label }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ['Apply for visa', 'Documents Uploaded', 'Waiting for Verification', 'Verified/Rejected'];

export default function CustomizedSteppers({ activeStep, verified }) {

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <CustomStepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => <ColorlibStepIcon activeStep={activeStep} {...props} verified={verified} label={label}/>} // Pass verified prop

              style={{ textAlign: 'center' }} onClick={(e) => {
              }}>{label === "Verified/Rejected" ? activeStep == 3 && verified ? 'Verified' : activeStep == 3 && !verified ? 'Rejected' : label : label}</StepLabel>
          </Step>
        ))}
      </CustomStepper>
    </Stack>
  );
}
