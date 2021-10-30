import { Redirect, Route, useLocation } from "react-router"

export const AuthRoute = ({ isLoggedIn, ...props }) => {
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