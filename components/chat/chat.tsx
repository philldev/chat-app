import { FC } from 'react'
import ChatContainer from './layout/chat-container'
import MessageInput from './message-input'
import Messages from './messages'
import UserInfo from './user-info'

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
	return (
		<ChatContainer>
			<UserInfo />
			<Messages />
			<MessageInput />
		</ChatContainer>
	)
}

export default Chat
