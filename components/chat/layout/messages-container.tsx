import { FC } from 'react'

interface MessagesContainerProps {}

const MessagesContainer: FC<MessagesContainerProps> = (props) => {
	return (
		<div className='flex flex-col justify-end flex-1 px-8 pb-2 space-y-3 text-sm'>
			{props.children}
		</div>
	)
}

export default MessagesContainer
