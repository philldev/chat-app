import { Flex } from '@chakra-ui/layout'
import {
	arrayUnion, doc,
	getDoc, updateDoc
} from '@firebase/firestore'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { useAuth } from '../../firebase/AuthContext'
import { ChatHeader } from './components/ChatHeader'
import { ChatList } from './components/ChatList'
import { MessageInput } from './components/MessageInput'

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
				if (docSnap.exists() && mounted) setChat({ ...docSnap.data() })
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
			value={{ chat, isLoading, isMember, joinChat, error }}
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
