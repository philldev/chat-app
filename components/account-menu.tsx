import { FC } from 'react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChatAltIcon } from '@heroicons/react/solid'
import Image from 'next/image'

interface AccountMenuProps {}

const AccountMenu: FC<AccountMenuProps> = () => {
	return (
		<div className='flex items-center justify-between h-16 px-2'>
			<div className='relative flex items-center justify-center w-10 h-10 overflow-hidden text-xs bg-blue-500 rounded-full'>
				<Image objectFit='cover' layout='fill' alt='avatar' src='https://avatars.dicebear.com/api/male/test.svg' />
			</div>
			<div className='flex gap-2'>
				<button>
					<ChatAltIcon className='w-7 h-7' />
				</button>
				<button>
					<DotsVerticalIcon className='w-7 h-7' />
				</button>
			</div>
		</div>
	)
}

export default AccountMenu
