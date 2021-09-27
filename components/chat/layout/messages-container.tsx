import { FC } from 'react'

interface MessagesContainerProps {}

const MessagesContainer: FC<MessagesContainerProps> = (props) => {
	return (
		<div className='relative flex-1 overflow-y-auto '>
			<div className='absolute inset-0 flex flex-col px-8 pb-2 space-y-3 text-sm justify-items-end'>{props.children}</div>
		</div>
	)
}

export default MessagesContainer
