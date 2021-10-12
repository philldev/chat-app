import { useState } from 'react'
import './App.scss'
import { Chat } from './Chat'
import { SelectChat } from './SelectChat'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
	return (
		<div className='app dark-theme'>
			<Router>
				<Switch>
					<Route path='/' exact>
						<div className='app-container app-container__compact'>
							<SelectChat />
						</div>
					</Route>
					<Route path='/:chatId' exact>
						<div className='app-container'>
							<Chat />
						</div>
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
