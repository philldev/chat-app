import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { appTheme } from './styles'
import { AuthProvider } from './context/AuthContext'
import { App } from './components/App'

const ROOT = document.getElementById('root')

ReactDOM.render(
	<ChakraProvider theme={appTheme}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ChakraProvider>,
	ROOT
)

