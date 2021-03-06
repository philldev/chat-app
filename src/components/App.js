import { Box } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Routes } from './Routes'

export const App = () => {
	const { isLoading: isFetchingUser, user } = useAuth()
	const isLoggedIn = user !== null
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
						<Routes {...{ isLoggedIn }} />
					</Switch>
				</BrowserRouter>
			)}
		</Box>
	)
}