import { FC } from 'react'
import ChatContainer from './layout/chat-container'
import MessageInput from './message-input'
import Messages from './messages'
import ContactInfo from './contact-info'
import Chat from '../../types/chat'

interface ChatProps {
	chat: Chat | null
	onBackClick: () => void
}

const ChatMessageBox: FC<ChatProps> = (props) => {
	return (
		<ChatContainer showChat={props.chat ? true : false}>
			{props.chat ? (
				<>
					<ContactInfo onBackClick={props.onBackClick} />
					<Messages />
					<MessageInput />
				</>
			) : (
				<div className="grid place-items-center">No Chat</div>
			)}
		</ChatContainer>
	)
}

export default ChatMessageBox
