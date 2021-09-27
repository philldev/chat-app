import { FC } from 'react'

interface UserInfoProps {}

const UserInfo: FC<UserInfoProps> = () => {
	return (
		<div className='flex items-center h-16 px-2 border-b border-gray-900'>
			<div className='flex items-center space-x-2'>
				<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 text-xs bg-red-500 rounded-full'>
					avatar
				</div>
				<div>Mark Goldbridge</div>
			</div>
		</div>
	)
}

export default UserInfo
