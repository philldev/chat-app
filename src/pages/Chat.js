import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import { doc, getDoc, collection, getDocs } from '@firebase/firestore'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase'

const ChatContext = React.createContext(null)

const ChatProvider = ({ children }) => {
	const [chat, setChat] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(true)
	const { chatId } = useParams()
	React.useEffect(() => {
		let mounted = true
		const getChat = async () => {
			try {
				const docRef = doc(db, 'chats', chatId)
				const docSnap = await getDoc(docRef)
				const messagesSnap = await getDocs(
					collection(db, 'chats', chatId, 'messages')
				)
				let messages = []
				messagesSnap.forEach((doc) => {
					messages = [...messages, doc.data()]
				})
				if (mounted) setChat({ ...docSnap.data(), messages })
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
		<ChatContext.Provider value={{ chat, isLoading }}>
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
	const { chat } = useChat()
	return (
		<VStack flexGrow='1' spacing='4' py='2' overflowY='auto'>
			{chat.messages?.map((m, index) => (
				<MessageItem
					key={index}
					username={m.from}
					avatarURL={`https://avatars.dicebear.com/api/identicon/${m.from}.svg`}
					message={m.content}
				/>
			))}
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
	const { chat } = useChat()
	return (
		<Flex
			p='4'
			borderBottom='1px solid'
			borderColor='slate.500'
			justifyContent='space-between'
		>
			<Flex alignItems='center'>
				<Box as='button' mr='4'>
					<Avatar
						size='md'
						name='chat'
						src={`https://avatars.dicebear.com/api/identicon/${chat?.name}.svg`}
					/>
				</Box>
				<Text color='slate.900' fontWeight='bold'>
					{chat?.name}
				</Text>
			</Flex>
			<Button as={Link} to='/' colorScheme='slate'>
				Leave
			</Button>
		</Flex>
	)
}

const MessageInput = () => {
	return (
		<Box display='flex'>
			<Input
				placeholder='type your message'
				py='8'
				border='none'
				bg='slate.300'
				borderRadius='0'
				_focus={{ border: 'none' }}
			/>
			<Button
				colorScheme='slate'
				py='8'
				px='8'
				borderRadius='0'
				outline='none'
				boxShadow='none !important'
			>
				Send
			</Button>
		</Box>
	)
}
