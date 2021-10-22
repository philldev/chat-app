import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text } from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAuth } from '../firebase/AuthContext'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../firebase'
import { doc, setDoc } from '@firebase/firestore'

export const HomePage = () => {
	const { signout, user } = useAuth()
	return (
		<Box w='full' h='full'>
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
							name={user.username}
							src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
						/>
					</Box>
					<Text color='slate.900' fontWeight='bold'>
						{user.username.toUpperCase()}
					</Text>
				</Flex>
				<Button colorScheme='slate' onClick={signout}>
					Sign Out
				</Button>
			</Flex>
			<Box>
				{new Array(4).fill('').map((_, index) => (
					<Link key={index} to={`/chat/${index}`}>
						<ChatItem
							chatName={'test'}
							chatAvatarURL={`https://avatars.dicebear.com/api/identicon/${index}.svg`}
						/>
					</Link>
				))}
			</Box>
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
	const onSubmit = async (data) => {
		const newChat = {
			id: uuidv4(),
			owner: user,
			name: data.chatName,
			users: [user],
			messages: [],
		}
		try {
			setIsLoading(true)
			await setDoc(doc(db, 'chats', newChat.id), newChat)
		} catch (error) {
			console.log(error.code)
		} finally {
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
					New Chat
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
					<ModalHeader>New Chat</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box w='full'>
							<Input
								bg='slate.200'
								border='none'
								placeholder='Enter chat name'
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
							Create chat
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

const ChatItem = ({ chatName, chatAvatarURL }) => {
	return (
		<Box display='flex' p={4} cursor='pointer' _hover={{ bg: 'slate.200' }}>
			<Avatar name={chatName} src={chatAvatarURL} mr={4} />
			<Text fontSize='xl' fontWeight='bold'>
				{chatName}
			</Text>
		</Box>
	)
}
