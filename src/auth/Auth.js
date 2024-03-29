import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth-context'
import { Container, Button, Grid, Card, TextField } from '@material-ui/core'
import './Auth.css'
import Particles from 'react-particles-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {css} from 'glamor'
import {usePosition} from 'use-position'
import { useForm } from 'react-hook-form'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [location, setLocation] = useState(false)
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState();
    const [ loggedIn, setLoggedIn ] = useState(true)
    const [ login, setLogin ] = useState({
        email: '',
        password: '',
        name:''
    })

    const { register, errors, handleSubmit } = useForm()

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
    const handleImageUpload = event => {
        let pickedFile = event.target.files[0]
        setFile(pickedFile)
    }
    
    const switchMode = () => {
        setLoggedIn(prevMode => !prevMode)
    }
    const getLoc = () => {
        
    }
    
    let date = new Date()
    let time = date.getTime()
    const authSubmit = async (e) => {
        // console.log(e);
        
        e.preventDefault()
        if(loggedIn){
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
                .then(async response => {
                    if(response.ok) {
                        const testResp = await response.json()
                        toast.success(`Logged in successfully Today's date is : ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} Time is ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, {
                            autoClose: false,
                            closeOnClick: true,
                            closeButton: true,
                        })
                        if(date.getHours() < 12 && date.getHours() >= 4){
                            
                            setTimeout(() => {
                                toast.dark('GoodMorning!!!')
                            }, 5000)
                        }
                        else if(date.getHours() >= 12 && date.getHours() <= 17) {
                            
                            setTimeout(() => {
                                toast('GoodAfternoon!!!', {
                                    draggable: true,
                                    draggablePercent: 100,
                                })
                            }, 5000)
                        }
                        else if(date.getHours() > 17 && date.getHours() <= 21) {
                            
                            setTimeout(() => {
                                toast.dark('GoodEvening')
                            }, 5000)
                        }
                        else if(date.getHours() > 21 && date.getHours() <= 24) {
                            setTimeout(() => {
                                toast.dark('GoodNight!!!')
                            }, 5000)
                        }
                        else {
                            toast('Cant get timestap')
                        }
                        auth.login(testResp.userId, testResp.token)
                        // auth.userId(testResp.userId)
                        
                    }
                    else {
                        toast.error("Wrong Credentials.. Please Enter Correct One to Log in");
                    }
                })
                } catch (err) {
                    toast.error("Server not responding");
                    
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
                .then(async response => {
                    if(response.ok) {
                        const testResp = await response.json()
                        toast.success('Welcome...!!! Create your post to see them in feed and enjoy', {
                            autoClose: false,
                            closeOnClick: true,
                            closeButton: true
                        })
                        auth.login(testResp.userId, testResp.token)
                    }
                    else {
                        toast.error("Wrong Credentials.. Please check your credentials.");
                    }
                    
                })
                
            } catch (error) {
                toast.error("Server not responding");
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
                                <div className="text-center input-cont">
                                    <TextField id="outlined-basic" label="Name" variant="outlined" name="name" onChange={onChangeHandler} ref={register({ required: true, minLength: 5 })} />
                                    {errors.name && "Name is required with 5 charachers minumum"}
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
                                {previewUrl && <div className="image-preview">
                                    <img src={previewUrl} alt="" className="img-fluid"/>
                                </div>}
                                <div>
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageUpload} className="file-upload" name="file" />
                                </div>
                            </div>
                        )}
                        <div>
                            <div className="text-center input-cont">
                                <TextField id="outlined-basic" label="Email" variant="outlined" name="email" onChange={onChangeHandler} ref={register({ required: true })} />
                                {errors.email && "Invalid email"}
                            </div>
                        </div>
                        <div>
                            <div className="text-center input-cont">
                                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" name="password" ref={register({ required: true, minLength: 8, maxLength: 20 })} onChange={onChangeHandler} />
                                {errors.password && "Invalid password"}
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
            {/* <Particles
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
            /> */}
            <ToastContainer />
        </form>
    )
}

export default Auth