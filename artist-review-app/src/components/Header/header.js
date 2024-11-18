import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import ArtistReviewAppLogo from '../../components/Assets/ArtistReviewAppLogo.png';

const Header = () => {
    const location = useLocation();
    
    return (
        <Navbar className="main-navbar" dark expand="md">
            <Container>
                <NavbarBrand tag={Link} to="/">
                    <img src={ArtistReviewAppLogo} alt="Artist Review App" />
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink 
                            tag={Link} 
                            to="/"
                            className={location.pathname === '/' ? 'active' : ''}
                        >
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink 
                            tag={Link} 
                            to="/profile"
                            className={location.pathname === '/profile' ? 'active' : ''}
                        >
                            Profile
                        </NavLink>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;