import { LoginPage, SignupPage } from "../pages";

export const auth = [
	{
		component : SignupPage,
		path : '/signup',
		exact : true
	},
	{
		component : LoginPage,
		path : '/login',
		exact : true
	},
]