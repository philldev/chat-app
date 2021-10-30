import * as React from 'react'
import { useLocation } from 'react-router'

const HomeDesktopContext = React.createContext()

export const HomeDesktopProvider = ({ children }) => {
	const [selectedChat, setSelectedChat] = React.useState(null)
	const selectChat = (chatId) => setSelectedChat(chatId)
	const { state } = useLocation()

	React.useEffect(() => {
		console.log(state)
		if (state?.chatId) {
			selectChat(state.chatId)
		}
	}, [state])

	return (
		<HomeDesktopContext.Provider value={{ selectChat, selectedChat }}>
			{children}
		</HomeDesktopContext.Provider>
	)
}

export const useHomeDesktop = () => {
	const ctx = React.useContext(HomeDesktopContext)
	if (ctx === undefined) throw new Error('No Home Desktop Context Provided!')
	return ctx
}
