import { FC } from 'react'
import ChatContainer from './layout/chat-container'
import MessageInput from './message-input'
import Messages from './messages'
import ContactInfo from './contact-info'

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
	return (
		<ChatContainer>
			<ContactInfo />
			<Messages />
			<MessageInput />
		</ChatContainer>
	)
}

export default Chat
