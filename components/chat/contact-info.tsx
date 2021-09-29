import { FC } from 'react'

interface UserInfoProps {
	onBackClick: () => void
}

const ContactInfo: FC<UserInfoProps> = (props) => {
	return (
		<div className='flex items-center h-16 px-2 border-b border-gray-900'>
			<div className='flex items-center w-full space-x-2'>
				<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 text-xs bg-red-500 rounded-full'>
					avatar
				</div>
				<div className='flex-1'>Mark Goldbridge</div>
				<button onClick={props.onBackClick} className='block sm:hidden'>
					Go Back
				</button>
			</div>
		</div>
	)
}

export default ContactInfo
