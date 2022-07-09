import React from 'react'

function HomeSvgSelector(props) {
  const {id, width, height, fill, opacity} = props
  switch (id) {
    case "arrowRight":
      return(
        <svg width={width ? width : "54"} height={height ? height : "103"} viewBox="0 0 54 103" fill={fill ? fill : "none"} xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5.5L49 51L5 97.5" stroke="white" strokeOpacity={opacity? opacity: "0.22"} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
        
    case "delete":
      return(
        <svg width={width ? width :"21"} height={height ? height :"24"} viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3.5L18 20.5M18 3.5L3 20.5" stroke="#9A473C" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

      )

      case "edit":
      return(
        <svg width="507.451px" height="507.45px" viewBox="0 0 507.451 507.45" xmlns="http://www.w3.org/2000/svg" style="enable-background:new 0 0 507.451 507.45;">
		<path d="M440.813,280.5c0-7.65,2.55-15.3,2.55-25.5s0-17.85-2.55-25.5l53.55-43.35c5.1-5.1,5.1-10.2,2.55-15.3l-51-89.25
			c-2.55-2.55-7.649-5.1-15.3-2.55l-63.75,25.5c-12.75-10.2-28.05-17.85-43.35-25.5l-10.2-66.3C315.863,5.1,308.212,0,303.113,0
			h-102c-5.101,0-12.75,5.1-12.75,10.2l-10.2,68.85c-15.3,5.1-28.05,15.3-43.35,25.5l-61.2-25.5c-7.65-2.55-12.75,0-17.851,5.1
			l-51,89.25c-2.55,2.55,0,10.2,5.1,15.3l53.55,40.8c0,7.65-2.55,15.3-2.55,25.5s0,17.85,2.55,25.5l-53.55,43.35
			c-5.1,5.101-5.1,10.2-2.55,15.301l51,89.25c2.55,2.55,7.649,5.1,15.3,2.55l63.75-25.5c12.75,10.2,28.05,17.85,43.35,25.5
			l10.2,66.3c0,5.1,5.1,10.2,12.75,10.2h102c5.101,0,12.75-5.101,12.75-10.2l10.2-66.3c15.3-7.65,30.6-15.3,43.35-25.5l63.75,25.5
			c5.101,2.55,12.75,0,15.301-5.101l51-89.25c2.55-5.1,2.55-12.75-2.551-15.3L440.813,280.5z M252.113,344.25
			c-48.45,0-89.25-40.8-89.25-89.25s40.8-89.25,89.25-89.25s89.25,40.8,89.25,89.25S300.563,344.25,252.113,344.25z"/>
</svg>

      )
    default:
      break;
  }
}

export {HomeSvgSelector}