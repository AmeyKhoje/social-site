import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem, Container, Row, NavbarBrand, Collapse, Col } from 'react-bootstrap'
import { AuthContext } from '../../context/auth-context'
import './Nav.css'

const Navigation = (props) => {
    // console.log(props.name)
    const auth = useContext(AuthContext)
    const [ profileData, setProfileData ] = useState([])
    // const [ authUserId, setAuthUserId ] = useState('')
    console.log(props.usrId)
    let id = auth.userId
    console.log(auth.userId);
    
    useEffect(() => {
        const getProfile = async() => {
            try {
                const profData = await fetch(`http://localhost:5000/api/users/profile/5ede43603739311178752d11`)
                let convProfData = await profData.json()
                const finalProfData = convProfData.profile
                setProfileData(finalProfData)
                // console.log(finalProfData);
            } catch (error) {
                console.log(error);   
            }
        }
        getProfile()
    }, [auth.userId])

    return (
        <Container fluid>
            <Row>
                <Col lg={12} className="p-0">
                    <Navbar expand="lg" className="navbar-cust">
                        <NavbarBrand href="/">Demo</NavbarBrand>
                        <Navbar.Collapse>
                            <Nav className="m-auto navbar-cust_menu">
                                {auth.isLoggedIn &&<NavItem>
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
                            <Nav className="ml-auto navbar-cust_menu">
                                {!auth.isLoggedIn && <NavLink to='/auth'>
                                    Login
                                </NavLink>}
                                {auth.isLoggedIn && <NavLink to="/auth" onClick={auth.logout} className="prof-link" >
                                    <div className="prof-img">
                                        <img src="" alt=""/>
                                    </div>
                                    <div>
                                        Amey
                                    </div>
                                </NavLink>}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    )
}

export default Navigation