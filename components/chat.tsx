import { FC } from 'react'

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
	return (
		<div className='flex flex-col flex-1 bg-gray-800'>
			<div className='flex items-center h-16 px-2 border-b border-gray-900'>
				<div className='flex items-center space-x-2'>
					<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 text-xs bg-red-500 rounded-full'>
						avatar
					</div>
					<div>Mark Goldbridge</div>
				</div>
			</div>
			<div className='flex flex-col justify-end flex-1 px-8 pb-2 space-y-3 text-sm'>
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
			</div>
			<div className='flex items-center p-2 overflow-y-hidden border-t border-gray-900'>
				<input
					className='w-full p-2 bg-gray-900 rounded outline-none'
					placeholder='Type your message here'
				/>
			</div>
		</div>
	)
}

export default Chat
