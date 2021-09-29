import { FC } from 'react'
import Image from 'next/image'

interface ChatListItemProps {}

const ChatListItem: FC<ChatListItemProps> = () => {
	return (
		<div className='flex gap-2 cursor-pointer'>
			<div className='relative flex items-center justify-center w-12 h-12 overflow-hidden text-xs bg-blue-500 rounded-full'>
				<Image
					objectFit='cover'
					layout='fill'
					alt='avatar'
					src='https://avatars.dicebear.com/api/male/23123.svg'
				/>
			</div>
			<div className='flex flex-col flex-1 w-full truncate'>
				<div>Mark Goldbridge</div>
				<div className='truncate'>
					Lorem ipsum dolor sit amet, consectetur adip
				</div>
			</div>
		</div>
	)
}

export default ChatListItem
