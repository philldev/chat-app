import { FC } from 'react'

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
			<div className='flex flex-col p-2 space-y-2'>
				<div className='flex gap-2'>
					<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 text-xs bg-red-500 rounded-full'>
						avatar
					</div>
					<div className='flex flex-col flex-1 w-full truncate'>
						<div>Mark Goldbridge</div>
						<div className='truncate'>
							Lorem ipsum dolor sit amet, consectetur adip
						</div>
					</div>
				</div>
				<div className='flex gap-2'>
					<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 text-xs bg-red-500 rounded-full'>
						avatar
					</div>
					<div className='flex flex-col flex-1 w-full truncate'>
						<div>Mark Goldbridge</div>
						<div className='truncate'>
							Lorem ipsum dolor sit amet, consectetur adip
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ChatList
