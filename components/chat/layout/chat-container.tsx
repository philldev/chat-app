import { Transition } from '@headlessui/react'
import { useWindowWidth } from '@react-hook/window-size'
import { FC } from 'react'

interface ChatContainerProps {
	showChat: boolean
}

const ChatContainer: FC<ChatContainerProps> = (props) => {
	const wWidth = useWindowWidth()
	if (!props.showChat && wWidth < 640) return null
	return (
		<div className='relative flex-1 bg-gray-800'>
			<div className='flex flex-col h-full'>{props.children}</div>
		</div>
	)
}

export default ChatContainer
