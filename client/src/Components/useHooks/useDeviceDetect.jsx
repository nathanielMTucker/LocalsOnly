import React, {useState, useEffect} from "react";

export default function useDeviceDetect() {

  const [isMobile, setMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = ()=>{setWidth(window.innerWidth)}
  
  
  useEffect(() => {
    const userAgent =
      typeof navigator === "undefined" ? "" : navigator.userAgent;

      const mobile = Boolean(
        userAgent.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i)
      ) || width < 870
      window.addEventListener('resize', updateDimensions)
   
      setMobile(mobile)
      return function cleanup(){
        window.removeEventListener('resize', updateDimensions)
      };
  }, [width]);

  return { isMobile }
}