import * as React from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { useHistory } from 'react-router'

export const SearchBox = () => {
	const [roomId, setRoomId] = React.useState('')
	const history = useHistory()
	const onSubmit = (e) => {
		e.preventDefault()
		if (roomId) {
			history.push('/chat/' + roomId)
		}
	}
	return (
		<Box as='form' onSubmit={onSubmit} position='relative'>
			<Input
				maxW='250px'
				bg='slate.200'
				border='none'
				placeholder='Search Room by id'
				value={roomId}
				onChange={(e) => setRoomId(e.target.value)}
			/>
			<SearchIcon position='absolute' right='2' top='3' color='slate.800' />
		</Box>
	)
}
