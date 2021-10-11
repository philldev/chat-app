import './App.scss'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

function App() {
	return (
		<div className='app dark-theme'>
			<div className='container'>
				<MessageList />
				<MessageInput />
			</div>
		</div>
	)
}

export default App
