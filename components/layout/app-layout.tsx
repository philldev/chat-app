import { FC } from 'react'

interface AppLayoutProps {}

const AppLayout: FC<AppLayoutProps> = (props) => {
	return (
		<div className='flex justify-center h-screen overflow-hidden text-white bg-gray-900'>
			{props.children}
		</div>
	)
}

export default AppLayout
