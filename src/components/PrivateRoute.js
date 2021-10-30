import { Redirect, Route } from 'react-router'

export const PrivateRoute = ({ isLoggedIn, ...props }) => {
	if (isLoggedIn) {
		return <Route {...props} />
	}
	return <Redirect to='/signup' />
}
