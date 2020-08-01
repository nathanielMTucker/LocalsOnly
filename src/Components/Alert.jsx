import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     border: '1px solid',
//     padding: theme.spacing(1),
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default ({text, severity})=>{
  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
      {open ? 
          <i className="far fa-times-circle"></i>:
          <i className="far fa-question-circle"></i>
        }
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={'right'} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div >
            <Alert
              variant="filled"
              severity={severity}
              action={
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={handleClick}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {text}
            </Alert>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
