import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { CopyIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	Timestamp,
	updateDoc,
} from '@firebase/firestore'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase'
import { useAuth } from '../firebase/AuthContext'
import { createId } from '../utils/createId'

const ChatContext = React.createContext(null)

const ErrorType = {
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
				if (!docSnap.exists() && mounted) setError(ErrorType.notExist)
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

const useChat = () => {
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

const ChatList = () => {
	const [messages, setMessages] = React.useState([])
	const { chatId } = useParams()
	React.useEffect(() => {
		const q = query(
			collection(db, 'chats', chatId, 'messages'),
			orderBy('createdAt', 'asc')
		)
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const messagesDocs = []
			querySnapshot.forEach((doc) => {
				messagesDocs.push(doc.data())
			})
			setMessages(messagesDocs)
		})
		return () => {
			unsubscribe()
		}
	}, [chatId])
	const ref = React.useRef(null)
	const gotoBottom = () => {
		const element = ref.current
		element.scrollIntoView()
	}

	React.useEffect(() => {
		if (messages.length > 0) gotoBottom()
	}, [messages])

	return (
		<VStack flexGrow='1' spacing='4' py='2' overflowY='auto'>
			{messages?.map((m, index) => (
				<MessageItem
					key={index}
					username={m?.from}
					avatarURL={`https://avatars.dicebear.com/api/identicon/${m?.from}.svg`}
					message={m?.content}
				/>
			))}
			<div ref={ref} />
		</VStack>
	)
}

const MessageItem = ({ username, avatarURL, message }) => {
	return (
		<Flex w='full' px='4'>
			<Avatar name='Dan Abrahmov' src={avatarURL} mr='4' />
			<VStack spacing='2' alignItems='start'>
				<Text fontWeight='bold'>{username}</Text>
				<Text p='2' bg='slate.200' borderRadius='lg'>
					{message}
				</Text>
			</VStack>
		</Flex>
	)
}

const ChatHeader = () => {
	const { chat, error } = useChat()
	const toast = useToast()
	const copyRoomIdToClipboard = () => {
		navigator.clipboard.writeText(chat?.id)
		toast({
			title: 'Room id copied',
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
	}
	return (
		<Flex
			p='4'
			borderBottom='1px solid'
			borderColor='slate.500'
			justifyContent='space-between'
			alignItems='center'
		>
			{chat && (
				<Flex alignItems='center'>
					<Box as='button' mr='4'>
						<Avatar
							size='sm'
							name='chat'
							src={`https://avatars.dicebear.com/api/identicon/${chat?.name}.svg`}
						/>
					</Box>
					<Box>
						<Text color='slate.900' fontWeight='bold' fontSize='xl'>
							{chat?.name}
						</Text>
						<Text
							cursor='pointer'
							onClick={copyRoomIdToClipboard}
							title='Copy room id'
							color='slate.900'
							fontSize='sm'
						>
							Room ID : {chat?.id} <CopyIcon />
						</Text>
					</Box>
				</Flex>
			)}
			{error === ErrorType.notExist && <Text>Chat Room not found!</Text>}
			<Button as={Link} to='/' colorScheme='slate'>
				Back
			</Button>
		</Flex>
	)
}

const MessageInput = () => {
	const { user } = useAuth()
	const { chat, isMember, joinChat, error } = useChat()
	const { register, handleSubmit, reset } = useForm({})
	const onSubmit = async (data) => {
		if (data.content) {
			const message = {
				id: createId(),
				from: user.username,
				content: data.content,
				createdAt: Timestamp.fromDate(new Date()),
			}
			await setDoc(doc(db, 'chats', chat.id, 'messages', message.id), message)
			reset()
			try {
			} catch (error) {
				console.log(error.code)
			}
		}
	}
	if (error === ErrorType.notExist) return null
	if (!isMember)
		return (
			<Box display='flex'>
				<Button
					colorScheme='green'
					w='full'
					borderRadius='0'
					py='8'
					onClick={joinChat}
				>
					Join
				</Button>
			</Box>
		)
	return (
		<Box as='form' onSubmit={handleSubmit(onSubmit)} display='flex'>
			<Input
				placeholder='type your message'
				py='8'
				border='none'
				bg='slate.300'
				borderRadius='0'
				_focus={{ border: 'none' }}
				autoComplete='off'
				{...register('content')}
			/>
			<Button
				colorScheme='slate'
				py='8'
				px='8'
				borderRadius='0'
				outline='none'
				boxShadow='none !important'
				type='submit'
			>
				Send
			</Button>
		</Box>
	)
}
