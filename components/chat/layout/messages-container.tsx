import { FC, useEffect, useRef } from 'react'

interface MessagesContainerProps {}

const MessagesContainer: FC<MessagesContainerProps> = (props) => {
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (ref.current) ref.current.scrollTo({ top: ref.current.scrollHeight })
	}, [ref])

	return (
		<div className='relative flex-1'>
			<div className='absolute inset-0 overflow-y-auto ' ref={ref}>
				<div className='flex flex-col justify-end min-h-full p-4 space-y-3 text-sm'>
					{props.children}
				</div>
			</div>
		</div>
	)
}

export default MessagesContainer
