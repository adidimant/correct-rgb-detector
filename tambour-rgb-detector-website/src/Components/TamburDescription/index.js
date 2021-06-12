import React from 'react'
import {FaBars} from 'react-icons/fa';
 import {
     ImageFormContainer, 
     NavLogo,
     FormTitle,
     MobileIcons,
     NavMenu,
     NavItem,
     NavLinks,
     NavBtn,
     NavBtnLink,
     DescriptionText,
     DescriptionPhoto
     } from './TextFormElements';

const DescriptionForm = () => {
    return (
       <div style={{display:"flex", flexDirection: "row-reverse"}}>

       <DescriptionText>
       <p>
       <h1>אנחנו בטמבור יודעים שהעולם מורכב מצבעים</h1>
       <br />
       <h2>בדיוק בשביל זה יצרנו בשבילכם את האתר שיעזור לכם למצוא </h2>
       <br />
       <h2>את הצבע שתמיד חלמתם עליו, הצבע שימלא לכם את החלל שחסר</h2>
       </p>
      
       </DescriptionText>
       <DescriptionPhoto>
       <img src="./MainPhoto.png" style={{width:"100%"}}></img>
       </DescriptionPhoto>

       </div>
    )
}

export default DescriptionForm
