import { Route } from 'react-router'
import { Chat, HomePage } from '../pages'
import { auth } from './auth'

const routes = [
	{
		component: HomePage,
		path: '/',
		exact: true,
	},
	{

		component: Chat,
		path: '/chat/:chatId',
		exact: true,
	},
	...auth,
]

export const generateRoutes = () =>
	routes.map(({ exact, component, path }, key) => (
		<Route  {...{ exact, component, path, key }} />
	))

export const Routes = () => <>{generateRoutes()}</>
