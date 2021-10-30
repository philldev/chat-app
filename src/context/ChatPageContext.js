import * as React from 'react'
import { useHistory, useParams } from 'react-router'
import chatsCollection from '../api/chat'
import { useAuth } from './AuthContext'

const ChatPageContext = React.createContext(null)

export const ChatErrorType = {
	notExist: 'not-exist',
}

const Chats = chatsCollection()

export const ChatPageProvider = ({ children }) => {
	const [chat, setChat] = React.useState(null)
	const [error, setError] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(true)
	const { chatId } = useParams()
	const { user } = useAuth()
	const history = useHistory()
	const isMember = chat?.usersId?.some((ids) => ids === user?.id)
	const isAdmin = user?.id === chat?.ownerId

	const deleteChat = async () => {
		if (isAdmin) {
			try {
				await Chats.deleteChat({ chatId: chat.id })
				history.push('/')
			} catch (error) {
				console.log(error.code)
			}
		}
	}
	const changeChatName = async (name) => {
		if (isAdmin) {
			try {
				await Chats.updateChatName({ name, userId: user.id })
				setChat((p) => ({ ...p, name }))
			} catch (error) {
				console.log(error.code)
			}
		}
	}
	const joinChat = async () => {
		if (chat) {
			let prevData = [...chat.usersId]
			try {
				setChat((p) => ({ ...p, usersId: [...p.usersId, user.id] }))
				await Chats.joinChat({ chatId, userId: user.id })
			} catch (error) {
				setChat((p) => ({ ...p, usersId: prevData }))
				console.log(error.code)
			}
		}
	}
	React.useEffect(() => {
		let mounted = true
		const getChat = async () => {
			try {
				let chatData = await Chats.getChat({ chatId })
				setChat(chatData)
			} catch (error) {
				console.log(error)
				if (error.message === 'no-chat-found') {
					setError(ChatErrorType.notExist)
				}
			} finally {
				if (mounted) setIsLoading(false)
			}
		}
		getChat()
		return () => {
			mounted = false
			const setLastSeen = async () => {
				try {
					await Chats.updateUserLastSeen({ userId: user.id, chatId })
				} catch (error) {
					console.log(error.code)
				}
			}
			setLastSeen()
		}
	}, [chatId, user?.id])
	return (
		<ChatPageContext.Provider
			value={{
				chat,
				isLoading,
				isMember,
				joinChat,
				error,
				deleteChat,
				changeChatName,
				isAdmin,
			}}
		>
			{children}
		</ChatPageContext.Provider>
	)
}

export const useChat = () => {
	const context = React.useContext(ChatPageContext)
	if (!context) throw new Error('Chat context is not provided')
	return context
}
