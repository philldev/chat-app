import { FC } from 'react'
import MessageInputContainer from './layout/message-input-container'

interface MessageInputProps {}

const MessageInput: FC<MessageInputProps> = () => {
	return (
		<MessageInputContainer>
			<input
				className='w-full p-2 bg-gray-900 rounded outline-none'
				placeholder='Type your message here'
			/>
		</MessageInputContainer>
	)
}

export default MessageInput
