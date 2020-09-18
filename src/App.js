import React, {useState ,useCallback, useEffect, Suspense} from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
// import Layout from './components/layout/Layout';
// import Pract from './components/layout/test/Pract'
// import Y from './components/layout/Y';
// import Posts from './feed/Posts'

// import AddPost from './feed/AddPost/AddPost';
// import Form from './feed/AddPost/DbConfig/DbConfig';
// import Auth from './auth/Auth'
import { AuthContext } from './context/auth-context'
// import ProfileInfo from './profile/profile-main/ProfileInfo';
// import UpdatePost from './feed/AddPost/UpdatePost';
// import AdminAuth from './auth/AdminAuth'
// import VerticalNav from './navigation/vertNav/VerticalNav'
// import VerticalNav from './components/navigation/vertNav/VerticalNav'
// import UpdateProfile from './profile/profile-main/UpdateProfile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Posts = React.lazy(() => import('./feed/Posts'));
const AddPost = React.lazy(() => import('./feed/AddPost/AddPost'))
const Auth = React.lazy(() => import('./auth/Auth'))
const ProfileInfo = React.lazy(() => import('./profile/profile-main/ProfileInfo'))
const UpdatePost = React.lazy(() => import('./feed/AddPost/UpdatePost'))
const AdminAuth = React.lazy(() => import('./auth/AdminAuth'))
const UpdateProfile = React.lazy(() => import('./profile/profile-main/UpdateProfile'))


let logoutTimer
function App() {
	// const [wether, setWether] = useState({
	// 	name: []
	// })
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false)
//   const darkMode = useCallback(() => {
// 	  if(isDarkMode === true) {
// 		  setIsDarkMode(false)
// 	  }
// 	  else {
// 		setIsDarkMode(true)
// 	  }

//   },[])
//   console.log(isDarkMode);

const darkModeHandler = () => {
	if(isDarkMode === true) {
		setIsDarkMode(false)
	}
	else {
		setIsDarkMode(true)
	}
	// console.log(isDarkMode);

}

  
  const login = useCallback((uid, token, expirationDate) => {
	setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
	);
	
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

//   const updateProfile = useCallback((usrid) => {
// 	setUserId(usrid)
//   })

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
	}
	
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

//   useEffect(() => {

//   },[updateProfile])


  let routes;
  let darkBack = isDarkMode ? 'dark-back' : 'light-back'
  if (token) {
	  routes = (
		<Switch>
			{/* <Suspense fallback={<div>Loading...</div>}> */}
				<Route path="/" exact>
					<Suspense fallback={<div>Loading...</div>}>
						<Posts />
					</Suspense>
				</Route>
				{/* <Route path="/posts" exact>
					<Posts />
				</Route> */}
				<Route path="/addpost" exact>
					<Suspense fallback={<div>Loading...</div>}>
						<AddPost />
					</Suspense>
				</Route>
				{/* <Route path="/test">
					<Form />
				</Route> */}
				<Route path="/profile" exact>
					<Suspense fallback={<div>Loading...</div>}>
						<ProfileInfo />
					</Suspense>
				</Route>
				<Route path="/post/:postId">
					<Suspense fallback={<div>Loading...</div>}>
						<UpdatePost />
					</Suspense>
				</Route>
				<Route path="/editprof">
					<Suspense fallback={<div>Loading...</div>}>
						<UpdateProfile />
					</Suspense>
				</Route>
				{/* </Suspense> */}
			<Redirect to="/" />
		</Switch>
	  )
  } else {
	  routes = (<Switch>
		    
			{/* <Suspense fallback={<div>Loading...</div>}> */}
			<Route path="/auth" exact>
				<Suspense fallback={<div>Loading...</div>}>
					<Auth />
				</Suspense>
			</Route>
			{/* </Suspense> */}
			<Redirect to="/auth" />
	  </Switch>)
  }
	
  return (
	  <AuthContext.Provider value={{
		isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
		logout: logout,
		isDark: isDarkMode
	  }}>
		  <Router>
		  	<Navigation usrId={userId} darkMode={darkModeHandler} />
			<main className={`main-container ${darkBack}`}>
				{routes}
			</main>
		  </Router>
		  <ToastContainer />
	  </AuthContext.Provider>
	// <div>
	// 	<Router>
	// 		<Navigation />
	// 		<Route path="/" exact>
	// 			<Posts />
	// 		</Route>
	// 		<Route path="/posts" exact>
	// 			<Posts />
	// 		</Route>
	// 		<Route path="/addpost" exact>
	// 			<AddPost />
	// 		</Route>
	// 		<Route path="/test">
	// 			<Form />
	// 		</Route>
	// 		<Route path="/auth" exact>
	// 			<Auth />
	// 		</Route>
	// 	</Router>
	// </div>
  );
}

export default App;
