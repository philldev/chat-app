import { Redirect, Route } from 'react-router'
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

const PrivateRoute = ({ isLoggedIn, ...props }) =>
	isLoggedIn ? <Route {...props} /> : <Redirect to='/login' />

const generateRoutes = (isLoggedIn) =>
	routes.map(({ exact, component, path, isPrivate }, key) =>
		!isPrivate ? (
			<Route {...{ exact, component, path, key }} />
		) : (
			<PrivateRoute {...{ exact, component, path, key, isLoggedIn }} />
		)
	)

export const Routes = ({ isLoggedIn }) => <>{generateRoutes(isLoggedIn)}</>
