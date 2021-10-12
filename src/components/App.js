import { useState } from 'react'
import './App.scss'
import { Chat } from './Chat'
import { SelectChat } from './SelectChat'

function App() {
	const [selectedChat, setSelectedChat] = useState(null)
	return (
		<div className='app dark-theme'>
			<div className={`app-container ${!selectedChat ? 'app-container__no-chat' : ''}`}>
				{selectedChat ? <Chat /> : <SelectChat />}
			</div>
		</div>
	)
}

export default App
