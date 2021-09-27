import { FC } from 'react'

interface MessageInputContainerProps {}

const MessageInputContainer: FC<MessageInputContainerProps> = (props) => {
	return (
		<div className='flex items-center p-2 overflow-y-hidden border-t border-gray-900'>
			{props.children}
		</div>
	)
}

export default MessageInputContainer
