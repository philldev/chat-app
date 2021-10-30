import { Chat, HomePage } from "../pages";

export const baseRoutes = [
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
]