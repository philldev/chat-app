import { Box } from '@chakra-ui/layout'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Routes } from '../routes'
import * as React from 'react'
import { Spinner } from '@chakra-ui/spinner'

function App() {
	const [isFetchingUser, setIsFetchingUser] = React.useState(true)

	React.useEffect(() => {
		setTimeout(() => {
			setIsFetchingUser(false)
		}, 1000)
	}, [])

	return (
		<Box
			display='grid'
			overflow='hidden'
			placeItems='center'
			bg='slate.50'
			h='100vh'
			w='100vw'
			color='slate.900'
		>
			{isFetchingUser ? (
				<Spinner size='xl' />
			) : (
				<BrowserRouter>
					<Switch>
						<Routes />
					</Switch>
				</BrowserRouter>
			)}
		</Box>
	)
}

export default App
