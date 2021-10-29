import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { CopyIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text } from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/modal'
import { useToast } from '@chakra-ui/toast'
import {
	collection,
	doc,
	getDocs,
	limit,
	query,
	setDoc, where
} from '@firebase/firestore'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import { createId } from '../../utils/createId'
import { Header } from './components/Header'

export const HomePage = () => {
	return (
		<Box w='full' h='full'>
			<Header />
			<ChatList />
			<NewChatBtn />
		</Box>
	)
}

const NewChatBtn = () => {
	const { user } = useAuth()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({})
	const [isLoading, setIsLoading] = React.useState(false)
	const history = useHistory()
	const onSubmit = async (data) => {
		const newChat = {
			id: createId(),
			ownerId: user.id,
			name: data.chatName,
			usersId: [user.id],
			messages: [],
		}
		try {
			setIsLoading(true)
			await setDoc(doc(db, 'chats', newChat.id), newChat)
			history.push('/chat/' + newChat.id)
		} catch (error) {
			console.log(error.code)
			setIsLoading(false)
		}
	}
	return (
		<>
			<Box position='fixed' bottom='0' left='0' w='100%'>
				<Button
					w='full'
					py='8'
					borderRadius='0'
					outline='none'
					boxShadow='none !important'
					onClick={onOpen}
				>
					Create Room +
				</Button>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent
					as='form'
					mx='2'
					bg='slate.100'
					color='slate.900'
					onSubmit={handleSubmit(onSubmit)}
				>
					<ModalHeader>New Room</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box w='full'>
							<Input
								bg='slate.200'
								border='none'
								placeholder='Enter room name'
								{...register('chatName', { required: true })}
							/>
							<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
								{errors.chatName?.type === 'required' &&
									'Chat name is required'}
							</Text>
						</Box>
					</ModalBody>
					<ModalFooter justifyContent='center'>
						<Button mr={3} type='submit' {...{ isLoading }}>
							Create Room
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

const ChatList = () => {
	const { user } = useAuth()
	const [chats, setChats] = React.useState([])

	React.useEffect(() => {
		let mounted = true
		const getChats = async () => {
			const q = query(
				collection(db, 'chats'),
				where('usersId', 'array-contains', user.id)
			)
			const querySnap = await getDocs(q)
			let chatsFromDoc = []
			querySnap.forEach((d) => {
				chatsFromDoc = [...chatsFromDoc, d.data()]
			})
			if (mounted) setChats(chatsFromDoc)
		}
		getChats()

		return () => {
			mounted = false
		}
	}, [user.id])

	return (
		<Box>
			<Text p='4'>Welcome to Chat Rooms!</Text>
			{chats.map((chat, index) => (
				<Link key={index} to={`/chat/${chat.id}`}>
					<ChatItem
						chatId={chat.id}
						chatName={chat.name.toUpperCase()}
						chatAvatarURL={`https://avatars.dicebear.com/api/identicon/${chat.name}.svg`}
						usersLastSeen={chat.usersLastSeen}
					/>
				</Link>
			))}
		</Box>
	)
}

const ChatItem = ({ chatName, chatAvatarURL, chatId, usersLastSeen }) => {
	const toast = useToast()
	const { user } = useAuth()
	const [unreadMessage, setUnreadMessage] = React.useState(null)
	const copyRoomIdToClipboard = () => {
		navigator.clipboard.writeText(chatId)
		toast({
			title: 'Room id copied',
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
	}
	React.useEffect(() => {
		const getUnReadMessages = async () => {
			let userLastSeen = usersLastSeen[user.id]
			let q = query(
				collection(db, 'chats', chatId, 'messages'),
				where('createdAt', '>', userLastSeen),
				limit(10)
			)
			const querySnap = await getDocs(q)
			if (querySnap.size > 0) setUnreadMessage(querySnap.size)
		}
		getUnReadMessages()
	}, [user, chatId, usersLastSeen])
	return (
		<Box display='flex' p={4} cursor='pointer' _hover={{ bg: 'slate.200' }}>
			<Box position='relative' mr='4'>
				<Avatar borderRadius='4' name={chatName} src={chatAvatarURL} />
				{unreadMessage && (
					<Flex
						alignItems='center'
						justifyContent='center'
						position='absolute'
						right='-2'
						top='-2'
						borderRadius='50%'
						bg='red.400'
						w='4'
						h='4'
					>
						<Text fontSize='10px' lineHeight='var(--chakra-fontSizes-xs)'>
							{unreadMessage > 9 ? '9+' : unreadMessage}
						</Text>
					</Flex>
				)}
			</Box>
			<Box>
				<Text fontSize='xl' fontWeight='bold'>
					{chatName}
				</Text>
				<Text
					cursor='pointer'
					onClick={copyRoomIdToClipboard}
					title='Copy room id'
					color='slate.900'
					fontSize='sm'
				>
					Room ID : {chatId} <CopyIcon />
				</Text>
			</Box>
		</Box>
	)
}
