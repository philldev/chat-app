import { FC } from 'react'

interface MessageProps {
	type: 'incoming-message' | 'user-message'
}

const Message: FC<MessageProps> = (props) => {
	const isIncomingMessage = props.type === 'user-message'
	return (
		<div className={isIncomingMessage ? 'flex flex-row-reverse' : ''}>
			<div className='max-w-[65%]'>
				<div
					className={`${isIncomingMessage ? 'text-right' : 'text-left'} ${
						isIncomingMessage ? 'bg-blue-800' : 'bg-gray-700'
					} rounded-lg max-w-max whitespace-pre-wrap p-2 pr-8`}
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima iusto
					em sequi deserunt molestiae delectus.
				</div>
			</div>
		</div>
	)
}

export default Message
