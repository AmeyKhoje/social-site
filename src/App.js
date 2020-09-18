import React, {useState ,useCallback, useEffect, Suspense} from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import { AuthContext } from './context/auth-context'
import Loading from './components/Loading/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Lazy Loading
const Posts = React.lazy(() => 
	new Promise((resolve, reject) =>
		setTimeout(() => 
			resolve(import('./feed/Posts'))
		, 1000) 
	)
);

const AddPost = React.lazy(() =>
	new Promise((resolve, reject) => 
		setTimeout(() =>
			resolve(import('./feed/AddPost/AddPost'))
		, 1000)
	)
)

const Auth = React.lazy(() =>
	new Promise((resolve, reject) =>
		setTimeout(() =>
			resolve(import('./auth/Auth'))
		, 1000)
	)
)

const ProfileInfo = React.lazy(() => 
	new Promise((resolve, reject) => 
		setTimeout(() => 
			resolve(import('./profile/profile-main/ProfileInfo'))
		, 1000)
	)
)

const UpdatePost = React.lazy(() =>
	new Promise((resolve, reject) =>
		setTimeout(() =>
			resolve(import('./feed/AddPost/UpdatePost'))
		, 1000)
	)
)

const AdminAuth = React.lazy(() =>
	new Promise((resolve, reject) =>
		setTimeout(() =>
			resolve(import('./auth/AdminAuth'))
		, 1000)
	)
)

const UpdateProfile = React.lazy(() =>
	new Promise((resolve, reject) =>
		setTimeout(() =>
			resolve(import('./profile/profile-main/UpdateProfile'))
		, 1000)
	)
)

let logoutTimer
function App() {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false)

	const darkModeHandler = () => {
		if(isDarkMode === true) {
			setIsDarkMode(false)
		}
		else {
			setIsDarkMode(true)
		}
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
		if (storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {
			login(storedData.userId, storedData.token, new Date(storedData.expiration));
		}
	}, [login]);

	let routes;

	let darkBack = isDarkMode ? 'dark-back' : 'light-back'

	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Suspense fallback={<Loading />}>
						<Posts />
					</Suspense>
				</Route>

				<Route path="/addpost" exact>
					<Suspense fallback={<Loading />}>
						<AddPost />
					</Suspense>
				</Route>
				
				<Route path="/profile" exact>
					<Suspense fallback={<Loading />}>
						<ProfileInfo />
					</Suspense>
				</Route>

				<Route path="/post/:postId">
					<Suspense fallback={<Loading />}>
						<UpdatePost />
					</Suspense>
				</Route>

				<Route path="/editprof">
					<Suspense fallback={<Loading />}>
						<UpdateProfile />
					</Suspense>
				</Route>

				<Redirect to="/" />
			</Switch>
		)
	} else {
		routes = (
		<Switch>
			<Route path="/auth" exact>
				<Suspense fallback={<Loading />}>
					<Auth />
				</Suspense>
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
	);
}

export default App;