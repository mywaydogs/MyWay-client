import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import axios from 'axios';

const Nav = styled.nav`
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    color: white;

    & a {
        color: inherit;
    }
`;

const NavUnorderedList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 100%;
`;

const NavListItem = styled.li`
    display: block;
    color: inherit;
    padding: 12px 20px;
    border-bottom: 2px solid #333;
    float: right;

    &:hover { 
        border-bottom: 2px solid white;
    }

    & a {
        color: inherit;
        text-decoration: none;
    }
`;

function NavbarItem({ to, floatLeft = false, ...props }) {
    const floatStyle = { float: floatLeft ? 'left' : 'right' };

    let component = (
        <NavListItem {...props} style={floatLeft ? floatStyle : {}}>
            {props.children}
        </NavListItem>
    );

    component = !to ? component : (
        <Link to={to} {...props} style={floatLeft ? floatStyle : {}}>
            {component}
        </Link>
    );

    return component;
}

function Navbar() {
    const userContext = useContext(UserContext);

    const logout = e => {
        axios.get('/api/auth/logout')
            .then(() => userContext.setUser({ isAuthenticated: false, name: 'אורח' }));
    }

    return (
        <Nav>
            <NavUnorderedList>
                <NavbarItem to="/">MyWay</NavbarItem>
                {userContext.user.isAuthenticated ? (
                    <>
                        <NavbarItem to='/customers'>לקוחות</NavbarItem>
                        <NavbarItem to='/initdb'>איפוס בסיס נתונים</NavbarItem>
                        <NavbarItem to='#' onClick={logout} floatLeft>התנתקות</NavbarItem>
                    </>
                )
                    : (
                        <>
                            <NavbarItem to='/register' floatLeft>הרשמה</NavbarItem>
                            <NavbarItem to='/login' floatLeft>התחברות</NavbarItem>
                        </>
                    )
                }
                <NavbarItem floatLeft>שלום {userContext.user.name}</NavbarItem>

            </NavUnorderedList>
        </Nav >
    );
}

export default Navbar;