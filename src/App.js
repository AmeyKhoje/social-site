import React, {useState ,useCallback, useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import Layout from './components/layout/Layout';
import Pract from './components/layout/test/Pract'
import Y from './components/layout/Y';
import Posts from './feed/Posts'
import AddPost from './feed/AddPost/AddPost';
import Form from './feed/AddPost/DbConfig/DbConfig';
import Auth from './auth/Auth'
import { AuthContext } from './context/auth-context'
import ProfileInfo from './profile/profile-main/ProfileInfo';
import UpdatePost from './feed/AddPost/UpdatePost';
import AdminAuth from './auth/AdminAuth'
// import VerticalNav from './navigation/vertNav/VerticalNav'
import VerticalNav from './components/navigation/vertNav/VerticalNav'
import UpdateProfile from './profile/profile-main/UpdateProfile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
			<Route path="/" exact>
				<Posts />
			</Route>
			<Route path="/posts" exact>
				<Posts />
			</Route>
			<Route path="/addpost" exact>
				<AddPost />
			</Route>
			<Route path="/test">
				<Form />
			</Route>
			<Route path="/profile">
				<ProfileInfo />
			</Route>
			<Route path="/post/:postId">
				<UpdatePost />
			</Route>
			<Route path="/editprof">
				<UpdateProfile />
			</Route>
			<Redirect to="/" />
		</Switch>
	  )
  } else {
	  routes = (<Switch>
		    <Route path="/auth" exact>
				<Auth />
			</Route>
			<Route path="/admin" exact>
				<AdminAuth />
			</Route>
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
