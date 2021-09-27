import { FC } from 'react'
import MessagesContainer from './layout/messages-container'
import Message from './message'

interface MessagesProps {}

const Messages: FC<MessagesProps> = () => {
	return (
		<MessagesContainer>
			{new Array(99).fill(0).map((item, index) => (
				<Message
					type={index % 2 === 0 ? 'incoming-message' : 'user-message'}
					key={index}
				/>
			))}
		</MessagesContainer>
	)
}

export default Messages
