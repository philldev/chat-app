import { FC } from 'react'

interface AppContainerProps {}

const AppContainer: FC<AppContainerProps> = (props) => {
	return (
		<div className='flex flex-1 h-full max-w-5xl max-h-screen min-h-screen rounded lg:py-8'>
			{props.children}
		</div>
	)
}

export default AppContainer
