import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { useForm } from 'react-hook-form'
import chatsCollection from '../api/chat'
import { useAuth } from '../context/AuthContext'
import { ChatErrorType, useChat } from '../context/ChatContext'

const Chats = chatsCollection()

export const MessageInput = () => {
	const { user } = useAuth()
	const { chat, isMember, joinChat, error, isLoading } = useChat()
	const { register, handleSubmit, reset } = useForm({})
	const onSubmit = async (data) => {
		if (data.content) {
			try {
				await Chats.addMessage({
					content: data.content,
					user,
					chatId: chat.id,
				})
				reset()
			} catch (error) {
				console.log(error)
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
