import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from '../Components/SignIn';

function Copyright(props) {
  return (
    <span className={`icon-text ${props.className}`}>
      <span>Copyright</span> 
      <span className="icon">
        <i className="far fa-copyright"/>
      </span>
      <span>LocalsOnly {new Date().getFullYear()}</span>
    </span>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/weekly?city,nature,travel)',
    backgroundRepeat: 'repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '50px'
  }
}));

const Opening = ({setUser})=>{
  const classes = useStyles();

  return (
    <main id="opening">
      <section  className={`${classes.image} columns is-hidden-mobile is-centered p-0 my-0 mx-0`} style={{height:"100vh",width:"100vw"}}>
        <div className="column my-4 is-half box is-frosted container">
        <section className="section container">
        <div className="has-text-centered"><img src="LocalsOnly.png"  style={{width:'10vw', borderRadius:"15px"}} alt=""/></div>
        <div className={`${classes.paper}`}>
        <SignIn setUser={setUser}/>
        </div>
        <div className="has-text-centered">
        <Copyright className="content has-text-grey-light"/>
        </div>
        </section>
        </div>
      </section>
    <section className="is-hidden-tablet">
      <div style={{position:'relative',left:0,top:0}} className=" mb-1" >
          <img src='https://source.unsplash.com/weekly?travel,nature' alt="" style={{ width:"200%", position:"relative", top:0, left:0}}/>
          <img src="LocalsOnly.png" style={{height:'75%', position:"absolute", top:"50%", left:"25%"}} alt=""/>
      </div>
      <div className={classes.paper + " mt-6"}>
        <SignIn setUser={setUser} text="black"/>
        </div>
        <Copyright/>
    </section>
    </main>
  );
}

export default Opening;

