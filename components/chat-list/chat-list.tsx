import { FC } from 'react'
import Chat from '../../types/chat'
import ChatListItem from './chat-list-item'

interface ChatListProps {
	onChatSelect: (chat: Chat) => void
}

const ChatList: FC<ChatListProps> = (props) => {
	return (
		<>
			<div className='p-2'>
				<div className='relative'>
					<input
						className='flex items-center w-full h-10 pl-6 text-white bg-gray-900 rounded-md outline-none'
						placeholder='search'
					/>
				</div>
			</div>
			<div
				onClick={() =>
					props.onChatSelect({ id: '12', messages: [], users: [] })
				}
				className='flex flex-col flex-1 p-4 space-y-4 overflow-hidden overflow-y-auto'
			>
				{new Array(99).fill(0).map((item, index) => (
					<ChatListItem key={index} />
				))}
			</div>
		</>
	)
}

export default ChatList
