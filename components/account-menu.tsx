import { FC } from 'react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChatAltIcon } from '@heroicons/react/solid'

interface AccountMenuProps {}

const AccountMenu: FC<AccountMenuProps> = () => {
	return (
		<div className='flex items-center justify-between h-16 px-2'>
			<div className='flex items-center justify-center w-10 h-10 text-xs bg-red-500 rounded-full'>
				avatar
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
