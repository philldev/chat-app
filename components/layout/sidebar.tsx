import { FC } from 'react'

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = (props) => {
	return (
		<div className='absolute inset-0 max-w-full flex flex-col flex-1 sm:relative sm:max-w-[30%] overflow-hidden bg-gray-800 border-r border-gray-900'>
			{props.children}
		</div>
	)
}

export default Sidebar
