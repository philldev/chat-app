import { FC } from 'react'

interface ChatContainerProps {}

const ChatContainer: FC<ChatContainerProps> = (props) => {
	return (
		<div className='flex flex-col flex-1 bg-gray-800'> {props.children}</div>
	)
}

export default ChatContainer
