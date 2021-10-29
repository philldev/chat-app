import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { doc, setDoc, Timestamp } from '@firebase/firestore'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { ChatErrorType, useChat } from '../../context/ChatPageContext'
import { db } from '../../firebase'
import { createId } from '../../utils/createId'

export const MessageInput = () => {
	const { user } = useAuth()
	const { chat, isMember, joinChat, error, isLoading } = useChat()
	const { register, handleSubmit, reset } = useForm({})
	const onSubmit = async (data) => {
		if (data.content) {
			const message = {
				id: createId(),
				from: user.username,
				content: data.content,
				createdAt: Timestamp.now().toMillis(),
			}
			await setDoc(doc(db, 'chats', chat.id, 'messages', message.id), message)
			reset()
			try {
			} catch (error) {
				console.log(error.code)
			}
		}
	}
	if (error === ChatErrorType.notExist || isLoading) return null
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
