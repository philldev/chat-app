import { FC } from 'react'

interface AppContainerProps {}

const AppContainer: FC<AppContainerProps> = (props) => {
	return (
		<div className='flex flex-1 h-full max-w-6xl max-h-screen min-h-screen py-4 rounded'>
			{props.children}
		</div>
	)
}

export default AppContainer
