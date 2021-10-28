import { Flex } from '@chakra-ui/layout'
import {
	arrayUnion,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from '@firebase/firestore'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { useAuth } from '../../firebase/AuthContext'
import { ChatHeader } from './components/ChatHeader'
import { ChatList } from './components/ChatList'
import { MessageInput } from './components/MessageInput'
import { useHistory } from 'react-router-dom'

const ChatContext = React.createContext(null)

export const ChatErrorType = {
	notExist: 'not-exist',
}

const ChatProvider = ({ children }) => {
	const [chat, setChat] = React.useState(null)
	const [error, setError] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(true)
	const { chatId } = useParams()
	const { user } = useAuth()
	const isMember = chat?.usersId?.some((ids) => ids === user?.id)
	const history = useHistory()
	const deleteChat = async () => {
		if (user?.id === chat?.ownerId) {
			try {
				let chatRef = doc(db, 'chats', chatId)
				await deleteDoc(chatRef)
				history.push('/')
			} catch (error) {
				console.log(error.code)
			}
		}
	}
	const changeChatName = async (name) => {
		if (user?.id === chat?.ownerId) {
			try {
				let chatRef = doc(db, 'chats', chatId)
				await updateDoc(chatRef, { name })
				setChat((p) => ({ ...p, name }))
			} catch (error) {
				console.log(error.code)
			}
		}
	}
	const joinChat = async () => {
		const docRef = doc(db, 'chats', chatId)
		let prevData = [...chat?.usersId]
		try {
			setChat((p) => ({ ...p, usersId: [...p.usersId, user.id] }))
			await updateDoc(docRef, {
				usersId: arrayUnion(user?.id),
			})
		} catch (error) {
			setChat((p) => ({ ...p, usersId: prevData }))
			console.log(error.code)
		}
	}
	React.useEffect(() => {
		let mounted = true
		const getChat = async () => {
			try {
				const docRef = doc(db, 'chats', chatId)
				const docSnap = await getDoc(docRef)
				if (docSnap.exists() && mounted) {
					setChat({ ...docSnap.data() })
					let ownerId = docSnap.data().ownerId
					let ownerRef = doc(db, 'users', ownerId)
					let ownerSnap = await getDoc(ownerRef)
					if (ownerSnap.exists() && mounted)
						setChat((p) => ({ ...p, admin: ownerSnap.data() }))

					let usersId = docSnap.data().usersId
					let roomUsers = []
					usersId.forEach(async (userId) => {
						let userRef = doc(db, 'users', userId)
						let userSnap = await getDoc(userRef)
						if (userSnap.exists()) {
							roomUsers.push(userSnap.data())
						}
					})
					setChat((p) => ({ ...p, roomUsers: roomUsers }))
				}
				if (!docSnap.exists() && mounted) setError(ChatErrorType.notExist)
			} catch (error) {
				console.log(error)
			} finally {
				if (mounted) setIsLoading(false)
			}
		}
		getChat()
		return () => {
			mounted = false
		}
	}, [chatId])
	return (
		<ChatContext.Provider
			value={{
				chat,
				isLoading,
				isMember,
				joinChat,
				error,
				deleteChat,
				changeChatName,
			}}
		>
			{children}
		</ChatContext.Provider>
	)
}

export const useChat = () => {
	const context = React.useContext(ChatContext)
	if (!context) throw new Error('Chat context is not provided')
	return context
}

export const Chat = () => {
	return (
		<Flex w='full' h='full' flexDir='column' overflowY='auto'>
			<ChatProvider>
				<ChatHeader />
				<ChatList />
				<MessageInput />
			</ChatProvider>
		</Flex>
	)
}
