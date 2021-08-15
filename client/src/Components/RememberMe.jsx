import React from "react";
// import { withFirebase } from '../Authentication';

const RememberMe = ({rememberMe, setRememberMe})=>{
  
  // const rememberMe = useRef(false);

  const onChange = ()=>{
    setRememberMe();
    // if(rememberMe){
    //   console.log("Remember my username");
    //   return;
    // }
    // console.log("Dont remember my username")
  }

  // const [isChecked] = React.useState(rememberMeRef.current.checked);

  // useEffect(()=>{
    // console.log(rememberMeRef);
  // },[rememberMeRef])

  return  <div className="control mt-4">
            <label htmlFor="rememberMe" className="checkbox">
              <input type="checkbox" name="rememberMe" onChange={onChange} checked={rememberMe}/>
              <span className="pl-1">remember me</span>
            </label>
          </div>
}

export default RememberMe;