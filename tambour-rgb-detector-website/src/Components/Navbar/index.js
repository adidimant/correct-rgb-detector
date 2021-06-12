import React from 'react'
import {FaBars} from 'react-icons/fa';
import {
    Nav, 
    NavbarContainer, 
    NavLogo,
    MobileIcons,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink
    } from './NavbarElements';


const Navbar = () => {
    return (
       <>
       <Nav>
           <NavbarContainer>
                <NavBtn>
                    <NavBtnLink to="/signin">היכנס אל האתר</NavBtnLink>
                </NavBtn>
               <MobileIcons>
                   <FaBars />
               </MobileIcons>
               <NavMenu>
                   <NavItem>
                        <NavLinks to="team">הצוות</NavLinks>
                   </NavItem>
                   <NavItem>
                        <NavLinks to="about">אודותינו</NavLinks>
                   </NavItem>
               </NavMenu>
               
               <NavLogo to="/"><img src="./logo.png"></img></NavLogo>
           </NavbarContainer>
       </Nav>
       </>
    )
}

export default Navbar
