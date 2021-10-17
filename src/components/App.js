import { Box } from "@chakra-ui/layout"
import { BrowserRouter, Switch } from "react-router-dom"
import { Routes } from "../routes"

function App() {
	return (
		<Box display='grid' placeItems='center' bg='slate.50' h='100vh' w='100vw' color='slate.900'>
			<BrowserRouter>
				<Switch>
					<Routes />
				</Switch>
			</BrowserRouter>
		</Box>
	)
}

export default App
