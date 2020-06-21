import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth-context'
import { Container, Button, Grid, Card, TextField } from '@material-ui/core'
import './Auth.css'
import Particles from 'react-particles-js'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState();
    const [ loggedIn, setLoggedIn ] = useState(true)
    const [ login, setLogin ] = useState({
        email: '',
        password: '',
        name:''
    })
    useEffect(() => {
        if (!file) {
          return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      }, [file]);
    const onChangeHandler = (e) => {
        const value = e.target.value
        setLogin({
            ...login,
            [e.target.name]: value
        })
        
    }
    console.log(login.name);
    const handleImageUpload = event => {
        let pickedFile = event.target.files[0]
        setFile(pickedFile)
    }
    
    const switchMode = () => {
        setLoggedIn(prevMode => !prevMode)
    }

    const authSubmit = async (e) => {
        e.preventDefault()
        if(loggedIn){
            console.log('login');
            try {
                await fetch(
                  'http://localhost:5000/api/users/login',
                  {method:'POST',
                  body: JSON.stringify({
                    email: login.email,
                    password: login.password
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }}
                )
                .then(response => response.json())
                .then(response => {
                    auth.login(response.userId, response.token)
                    auth.userId(response.userId)
                })
                // console.log(responseData);
                
                // auth.login(responseData.userId, responseData.token);
              } catch (err) {
                  console.log('cantt');
                  
              }
        }
        else {
            console.log('sign-up');
            try {
                const formData = new FormData()
                formData.append('name', login.name)
                formData.append('email', login.email)
                formData.append('password', login.password)
                formData.append('image', file)
                console.log(formData);
                
                await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    
                    body: formData
                })
                .then(response => response.json()
                .then(response => {
                    console.log(response);
                    auth.login(response.userId, response.token)
                    auth.userId(response.userId)
                }))
                
                
            } catch (error) {
                console.log('cant sign in');
                
            }
        }
        
    }
    return (
        <form className="auth-container">
            
            <Container>
                <Grid sm={12} lg={4} className="m-auto">
                    <Card className="auth-card">
                        <div className="auth-head">
                            <h2>
                                {!loggedIn ? 'Sign Up' : 'Login'}
                            </h2>
                        </div>
                        {!loggedIn && (
                            <div>
                                {/* <div>
                                    <label>Enter Your Name:</label>
                                </div> */}
                                <div className="text-center input-cont">
                                    {/* <input type="text" name="name" onChange={onChangeHandler} /> */}
                                    <TextField id="outlined-basic" label="Name" variant="outlined" name="name" onChange={onChangeHandler} />
                                </div>
                            </div>
                        ) }
                        {!loggedIn && (
                            <div>
                                <div>
                                    <label for="">
                                        Choose profile picture:
                                    </label>
                                </div>
                                <div>
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageUpload} />
                                </div>
                            </div>
                        )}
                        <div>
                            {/* <div>
                                <label for="">
                                    Enter email:
                                </label>
                            </div> */}
                            <div className="text-center input-cont">
                                {/* <input type="text" name="email" onChange={onChangeHandler} /> */}
                                <TextField id="outlined-basic" label="Email" variant="outlined" name="email" onChange={onChangeHandler} />
                            </div>
                        </div>
                        <div>
                            {/* <div>
                                <label for="">
                                    Enter Password:
                                </label>
                            </div> */}
                            <div className="text-center input-cont">
                                {/* <input type="password" name="password" onChange={onChangeHandler} /> */}
                                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" name="password" onChange={onChangeHandler} />
                            </div>
                        </div>
                        <div className="text-center input-cont">
                            <Button variant="contained" color="secondary" onClick={authSubmit} type="submit">
                                {!loggedIn ? 'SIGN-Up' : 'LOGIN'  }
                            </Button>
                        </div>
                        <div className="text-center input-cont">
                            <Button variant="contained" color="primary" onClick={switchMode}>
                                Switch to {!loggedIn ? 'Login' : 'Sign-Up'  }
                            </Button>
                        </div>
                    </Card>
                </Grid>
            </Container>
            <Particles
               params={{
                "particles": {
                    "number": {
                        "value": 130
                    },
                    "size": {
                        "value": 2
                    }
                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }} 
            />
        </form>
    )
}

export default Auth