import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import { doc, getDoc } from '@firebase/firestore'
import * as React from 'react'
import { useParams } from 'react-router-dom'
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
				if (mounted) setChat(docSnap.data())
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
	return (
		<VStack flexGrow='1' spacing='4' py='2' overflowY='auto'>
			<MessageItem
				username='Dan Abrahmov'
				avatarURL='https://bit.ly/dan-abramov'
				message={`
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				`}
			/>
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
						src='https://avatars.dicebear.com/api/identicon/1.svg'
					/>
				</Box>
				<Text color='slate.900' fontWeight='bold'>
					{chat?.name}
				</Text>
			</Flex>
			<Button colorScheme='slate'>Leave</Button>
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
