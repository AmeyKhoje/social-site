import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem, Container, Row, NavbarBrand, Collapse, Col } from 'react-bootstrap'
import { AuthContext } from '../../context/auth-context'
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import './Nav.css'

const Navigation = (props) => {
    console.log(props.darkMode);
    
    const auth = useContext(AuthContext)
    const [profileData, setProfileData] = useState({})
    const [ toggleDrop, setToggleDrop ] = useState(false)
    const [ isModeDark, setIsModeDark ] = useState(false)
    
    useEffect(() => {
        const getProfile = async () => {
            try {
                const profData = await fetch(`http://localhost:5000/api/users/profile/${auth.userId}`);
                const convProfData = await profData.json();
                const finalProfData = convProfData.profile;
                setProfileData({ ...finalProfData })
            } catch (error) {
                console.log(error);
            }
        }
        getProfile()
    }, [auth.userId])

    const dropHandler = (e) => {
        e.preventDefault()
        if(toggleDrop === true) {
            setToggleDrop(false)
           
        }
        else {
            setToggleDrop(true)
            setIsModeDark(true)
        }
    }
    
    // const darkModeHandler = () => {
    //     if(isModeDark === false) {
    //         setIsModeDark(true)
    //         auth.isDark(true)
    //         console.log(auth.isDark);
            
    //     }
    // }
    // let navClass = auth.isDark ? 'nvbar-cust_menu-dark' : 'navbar-cust_menu'
    let navMainClass = auth.isDark ? 'navbar-dark' : 'navbar-normal'
    let darkIcon = auth.isDark ? 'icon-dark' : 'icon-light'
    return (
        <Container fluid>
            <Row>
                <Col lg={12} className="p-0">
                    <Navbar expand="lg" className={`navbar-cust ${navMainClass}`}>
                        <NavbarBrand href="/">Socially</NavbarBrand>
                        <Navbar.Collapse>
                            <Nav className="m-auto navbar-cust_menu">
                                {auth.isLoggedIn && <NavItem>
                                    <NavLink to="/">
                                        Feed
                                    </NavLink>
                                </NavItem>}
                                {auth.isLoggedIn && <NavItem>
                                    <NavLink to="/addpost">
                                        Create Post
                                    </NavLink>
                                </NavItem>}
                                {auth.isLoggedIn && <NavItem>
                                    <NavLink to="/profile">
                                        Profile
                                    </NavLink>
                                </NavItem>}
                            </Nav>
                            <Nav className="ml-auto mr-5 navbar-cust_menu align-items-center">
                                {/* {!auth.isLoggedIn && <NavLink to='/auth' className="link-login">
                                    Login
                                </NavLink>} */}
                                {auth.isLoggedIn && <NavLink to="/auth" className="prof-link" onClick={dropHandler} onMouseEnter={dropHandler} onMouseLeave={dropHandler} >
                                    <div className="prof-img">
                                        <img src={profileData.image} alt="" />
                                    </div>
                                    <div>
                                        {profileData.name}
                                    </div>
                                    {toggleDrop && <div className="prof-drop">
                                        <div className="prof-drop_link-par">
                                            <Link to="/editprof">
                                                Edit Profile
                                            </Link>
                                        </div>
                                        <div className="prof-drop_link-par">
                                            <Link to="/profile">
                                                Show Profile
                                            </Link>
                                        </div>
                                        <div className="prof-drop_link-par">
                                            <Link onClick={auth.logout}>
                                                Logout
                                            </Link>
                                        </div>
                                    </div>}
                                </NavLink>
                                }
                                <div className="pl-2 pr-2">
                                    <Brightness4OutlinedIcon onClick={props.darkMode} className={darkIcon} />
                                </div>
                            </Nav>
                            {/* <Nav>{auth.isLoggedin ? <NavLink to='/auth' onClick={auth.logout} className="prof-link">Logout</NavLink> : ''}</Nav> */}
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    )
}

export default Navigation