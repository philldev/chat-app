import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import './SelectChat.scss'

export const SelectChat = () => {
	const history = useHistory()
	const location = useLocation()
	const toggleIsCreating = () => history.push('#create')
	return (
		<div className='select-chat__wrapper'>
			{location.hash === '#create' ? (
				<div className='select-chat__new'>
					<input className='input' placeholder='enter chat name' />
					<button className='btn'>Create</button>
				</div>
			) : (
				<>
					<div>
						<button onClick={toggleIsCreating} className='btn'>
							New Chat
						</button>
					</div>
					<p>or</p>
					<div className='select-chat__join'>
						<input className='input' placeholder='enter chat id' />
						<button className='btn'>Join</button>
					</div>
				</>
			)}
		</div>
	)
}
