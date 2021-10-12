import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import './Chat.scss'

export const Chat = () => {
	return (
		<div>
			<MessageList />
			<MessageInput />
		</div>
	)
}
