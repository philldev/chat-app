import { LoginPage, SignupPage } from '../pages'

export const auth = [
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
