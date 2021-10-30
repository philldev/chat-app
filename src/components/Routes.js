import { Route } from 'react-router'
import { routes } from '../routes'
import { AuthRoute } from './AuthRoute'
import { PrivateRoute } from './PrivateRoute'

export const Routes = ({ isLoggedIn }) => {
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
	return <>{generateRoutes(isLoggedIn)}</>
}
