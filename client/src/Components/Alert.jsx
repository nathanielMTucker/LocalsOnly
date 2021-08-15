import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import AlertMaterial from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     border: '1px solid',
//     padding: theme.spacing(1),
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

const Alert = ({text, severity})=>{
  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <div className="pl-1">
      <button aria-describedby={id} type="button" className={`button icon is-rounded px-0 is-inverted is-${severity}`} onClick={handleClick}>
      {open ? 
          <i className="far fa-times-circle py-0 px-0"></i>:
          <i className="far fa-question-circle py-0 px-0 my-0 mx-0"></i>
        }
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={'right'} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div >
            <AlertMaterial
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
            </AlertMaterial>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default Alert;