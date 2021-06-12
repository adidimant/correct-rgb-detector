import React from 'react'
import {SidebarContainer, Icon, CloseIcon, SideBtnWrap, SidebarRoute} from './SidebarElements';


const index = () => {
    return (

        <SidebarContainer>
        <Icon>
           <CloseIcon />
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to = "about">About</SidebarLink>
                <SidebarLink to = "team">Team</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to= "/signin" >Sign In</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
        </SidebarContainer>

    )
}

export default index
