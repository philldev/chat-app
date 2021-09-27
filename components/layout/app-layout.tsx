import { FC } from 'react'

interface AppLayoutProps {}

const AppLayout: FC<AppLayoutProps> = (props) => {
	return (
		<div className='flex justify-center min-h-screen text-white bg-gray-900'>
			{props.children}
		</div>
	)
}

export default AppLayout
