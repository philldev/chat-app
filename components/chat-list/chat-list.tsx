import { FC } from 'react'
import ChatListItem from './chat-list-item'

interface ChatListProps {}

const ChatList: FC<ChatListProps> = () => {
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
			<div className='flex flex-col flex-1 p-2 space-y-4 overflow-hidden overflow-y-auto'>
				{new Array(99).fill(0).map((item, index) => (
					<ChatListItem key={index} />
				))}
			</div>
		</>
	)
}

export default ChatList
