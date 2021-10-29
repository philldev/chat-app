import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { appTheme } from './theme'
import { AuthProvider } from './context/AuthContext'
import { App } from './App'
// import reportWebVitals from './reportWebVitals'

const ROOT = document.getElementById('root')

ReactDOM.render(
	<ChakraProvider theme={appTheme}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ChakraProvider>,
	ROOT
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
