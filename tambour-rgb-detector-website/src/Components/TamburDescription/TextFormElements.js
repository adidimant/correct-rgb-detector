import styled from 'styled-components';
import { Link as LinkR} from 'react-router-dom';
import { Link as LinkS} from 'react-scroll';


export const Nav = styled.nav`

    background: #fff;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px)
    {
        transition: 0.8s all ease;
    } 
`;

export const ImageFormContainer = styled.div `
    display: flex;
    justify-content: space-between;
    z-index: 1;
    width: 75%;
    margin: 0 auto;
    padding: 15px 40px 15px 40px;
    max-width: 800px;
    border: 1px solid #000;

    @media screen and (max-width: 960px)
    {
        transition: 0.8s all ease;
    } 
`;

export const FormTitle = styled.div`
    float: right;
    font-size: 14px;
    color: #008060;
`;

export const NavLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;

`

export const MobileIcons = styled.div`
display: none;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff;
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;

    @media screen and (max-width: 768px){
    display: none;
    }
`

export const NavItem = styled.li`
    height: 80px;
`

export const NavLinks = styled(LinkS)`
    color: #00806E;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active{
        border-bottom: 3px solid #01bf71;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px){
        display: none;
}
`

export const NavBtnLink = styled(LinkR)`

    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 6.6px 14.5px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`


export const DescriptionText = styled.div `
text-align: right;
padding: 80px 80px;
color: #00806E;
flex: 9;

.p2 {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}


@media screen and (max-width: 960px)
{
    transition: 0.8s all ease;
} 
`;

export const DescriptionPhoto = styled.div`
    
    flex: 5;
`