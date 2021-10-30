import * as React from 'react'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/modal'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import chatsCollection from '../../api/chat'
import { useAuth } from '../../context/AuthContext'

const Chats = chatsCollection()

export const NewChatDialog = ({ isOpen, onClose }) => {
	const { user } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({})
	const [isLoading, setIsLoading] = React.useState(false)
	const history = useHistory()
	const onSubmit = async (data) => {
		try {
			setIsLoading(true)
			const chat = await Chats.createChat({
				ownerId: user.id,
				name: data.chatName,
			})
			history.push('/chat/' + chat.id)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}
	return (
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
							{errors.chatName?.type === 'required' && 'Chat name is required'}
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
	)
}
