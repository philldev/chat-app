import { Route } from 'react-router'
import { HomePage } from '../pages'
import { auth } from './auth'

const routes = [
	{
		component: HomePage,
		path: '/',
		exact: true,
	},
	...auth,
]

export const generateRoutes = () =>
	routes.map(({ exact, component, path }, key) => (
		<Route  {...{ exact, component, path, key }} />
	))

export const Routes = () => <>{generateRoutes()}</>
