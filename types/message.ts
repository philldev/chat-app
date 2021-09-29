import User from './user'

interface Message {
	user: User
	createdAt: string
	text: string
}

export default Message
