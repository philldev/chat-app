import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import * as React from 'react'
import { Box } from '@chakra-ui/layout'
import { useChat } from '../../../context/ChatPageContext'
import { useDisclosure } from '@chakra-ui/hooks'

export const ChangeChatRoomName = () => {
	const { changeChatName, isAdmin } = useChat()
	const {
		isOpen: isVisible,
		onOpen,
		onClose,
	} = useDisclosure({ defaultIsOpen: false })
	const { newNameValue, onNewNameValueChange } = useNameValue()
	const handleChangeClick = async () => {
		await changeChatName(newNameValue)
		onClose()
	}
	if (!isAdmin) return null
	return (
		<>
			{isVisible && (
				<Box>
					<Input
						value={newNameValue}
						onChange={onNewNameValueChange}
						bg='slate.200'
						border='none'
						placeholder='Enter New Room Name'
						type='text'
						mb='1'
					/>
					<Button
						onClick={handleChangeClick}
						disabled={!newNameValue}
						colorScheme='green'
						w='full'
						mb='1'
					>
						Change
					</Button>
					<Button onClick={onClose} colorScheme='slate' w='full'>
						Cancel
					</Button>
				</Box>
			)}
			{!isVisible && <Button onClick={onOpen}>Change Room Name</Button>}
		</>
	)
}

const useNameValue = () => {
	const [newNameValue, setNewNameValue] = React.useState('')
	const onNewNameValueChange = (e) => setNewNameValue(e.target.value)
	return { newNameValue, onNewNameValueChange }
}
