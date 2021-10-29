import * as React from 'react'
import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Box, Text } from "@chakra-ui/layout"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { doc, setDoc } from "@firebase/firestore"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router"
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import { createId } from '../../utils/createId'

export const NewChatDialog = ({isOpen, onClose}) => {
	const { user } = useAuth()
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
