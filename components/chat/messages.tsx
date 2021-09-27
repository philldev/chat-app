import { FC } from 'react'
import MessagesContainer from './layout/messages-container'

interface MessagesProps {}

const Messages: FC<MessagesProps> = () => {
	return (
		<MessagesContainer>
			<div>
				<div className='max-w-[65%]'>
					<div className='p-2 pl-8 bg-gray-700 rounded-lg max-w-max'>
						Lorem ipsum dolor sit amet.
					</div>
				</div>
			</div>
			<div className='flex flex-row-reverse'>
				<div className='max-w-[65%]'>
					<div className='p-2 pr-8 text-right whitespace-pre-wrap bg-blue-800 rounded-lg max-w-max'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
						iusto em sequi deserunt molestiae delectus.
					</div>
				</div>
			</div>
		</MessagesContainer>
	)
}

export default Messages
