import { FC } from 'react'

interface ChatContainerProps {}

const ChatContainer: FC<ChatContainerProps> = (props) => {
	return (
		<div className='absolute inset-0 flex flex-col flex-1 min-h-full transform translate-x-full bg-gray-800 sm:relative sm:translate-x-0'> {props.children}</div>
	)
}

export default ChatContainer
