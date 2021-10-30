import { LoginPage, SignupPage } from '../pages'

export const authRoutes = [
	{
		component: SignupPage,
		path: '/signup',
		exact: true,
		isAuth: true,
	},
	{
		component: LoginPage,
		path: '/login',
		exact: true,
		isAuth: true,
	},
]
