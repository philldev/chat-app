import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { CopyIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { useToast } from '@chakra-ui/toast'
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from '@firebase/firestore'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../firebase'
import { useAuth } from '../firebase/AuthContext'
import { createId } from '../utils/createId'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const HomePage = () => {
	return (
		<Box w='full' h='full'>
			<Header />
			<ChatList />
			<NewChatBtn />
		</Box>
	)
}

const schema = yup.object({
	email: yup.string().required('Email is required').email('Email is invalid'),
	username: yup
		.string()
		.required('Username is required')
		.min(1, 'Username must be longer than 1 character')
		.max(25, 'Username cannot be longer than 25 characters'),
})

const Header = () => {
	const { signout, user } = useAuth()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			username: user.username,
			email: user.email,
		},
	})
	const [isLoading, setIsLoading] = React.useState(false)
	const onSubmit = (data) => {}
	return (
		<>
			<Flex
				p='4'
				borderBottom='1px solid'
				borderColor='slate.500'
				justifyContent='space-between'
			>
				<Flex onClick={onOpen} alignItems='center'>
					<Box as='button' mr='4'>
						<Avatar
							size='sm'
							name={user.username}
							src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
						/>
					</Box>
					<Text color='slate.900' fontWeight='bold'>
						{user.username.toUpperCase()}
					</Text>
				</Flex>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent
					as='form'
					mx='2'
					bg='slate.100'
					color='slate.900'
					onSubmit={handleSubmit(onSubmit)}
				>
					<ModalHeader>Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing='2' mb='4'>
							<VStack spacing='1' alignItems='flex-start' w='full'>
								<Text fontSize='sm'>Username</Text>
								<Input
									bg='slate.200'
									border='none'
									placeholder='Username'
									{...register('username', { required: true })}
								/>
								<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
									{errors.username?.message}
								</Text>
							</VStack>
							<VStack spacing='1' alignItems='flex-start' w='full'>
								<Text fontSize='sm'>Email</Text>
								<Input
									bg='slate.200'
									border='none'
									placeholder='Email'
									{...register('email', { required: true })}
								/>
								<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
									{errors.email?.message}
								</Text>
							</VStack>
						</VStack>
						<Button colorScheme='red' onClick={signout}>
							Sign Out
						</Button>
					</ModalBody>
					<ModalFooter justifyContent='center'>
						<Button colorScheme='slate' mr={3} type='submit' {...{ isLoading }}>
							Update Profile
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
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
					colorScheme='slate'
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
						<Button colorScheme='slate' mr={3} type='submit' {...{ isLoading }}>
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
			{chats.map((chat, index) => (
				<Link key={index} to={`/chat/${chat.id}`}>
					<ChatItem
						chatId={chat.id}
						chatName={chat.name.toUpperCase()}
						chatAvatarURL={`https://avatars.dicebear.com/api/identicon/${chat.name}.svg`}
					/>
				</Link>
			))}
		</Box>
	)
}

const ChatItem = ({ chatName, chatAvatarURL, chatId }) => {
	const toast = useToast()
	const copyRoomIdToClipboard = () => {
		navigator.clipboard.writeText(chatId)
		toast({
			title: 'Room id copied',
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
	}
	return (
		<Box display='flex' p={4} cursor='pointer' _hover={{ bg: 'slate.200' }}>
			<Avatar name={chatName} src={chatAvatarURL} mr={4} />
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
