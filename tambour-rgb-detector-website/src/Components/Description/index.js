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
               <NavLogo to="/"><img src="./logo.png"></img></NavLogo>
               <MobileIcons>
                   <FaBars />
               </MobileIcons>
               <NavMenu>
                   <NavItem>
                       <NavLinks to="about">About</NavLinks>
                   </NavItem>
                   <NavItem>
                       <NavLinks to="team">The Team</NavLinks>
                   </NavItem>
               </NavMenu>
               <NavBtn>
                   <NavBtnLink to="/signin">Sign In</NavBtnLink>
               </NavBtn>
           </NavbarContainer>
       </Nav>
       </>
    )
}

export default Navbar
