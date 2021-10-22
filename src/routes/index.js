import React from 'react'
import { Redirect, Route, useLocation } from 'react-router'
import { Chat, HomePage } from '../pages'
import { auth } from './auth'

const routes = [
	{
		component: HomePage,
		path: '/',
		exact: true,
		isPrivate: true,
	},
	{
		component: Chat,
		path: '/chat/:chatId',
		exact: true,
		isPrivate: true,
	},
	...auth,
]

const PrivateRoute = ({ isLoggedIn, ...props }) => {
	if (isLoggedIn) {
		return <Route {...props} />
	}
	return <Redirect to='/signup' />
}

const AuthRoute = ({ isLoggedIn, ...props }) => {
	const location = useLocation()
	if (!isLoggedIn) {
		return <Route {...props} />
	}
	return (
		<Redirect
			to={location.pathname.includes(props.path) ? '/' : location.pathname}
		/>
	)
}

const generateRoutes = (isLoggedIn) =>
	routes.map(({ exact, component, path, isPrivate, isAuth }, key) =>
		isAuth ? (
			<AuthRoute {...{ exact, component, path, key, isLoggedIn }} />
		) : isPrivate ? (
			<PrivateRoute {...{ exact, component, path, key, isLoggedIn }} />
		) : (
			<Route {...{ exact, component, path, key }} />
		)
	)

export const Routes = ({ isLoggedIn }) => {
	return <>{generateRoutes(isLoggedIn)}</>
}
