import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Box } from '@chakra-ui/layout'
import * as React from 'react'
import { NewChatDialog } from './NewChatDialog'

export const NewChatButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Box position='fixed' bottom='0' left='0' w='100%'>
				<Button
					w='full'
					py='8'
					borderRadius='0'
					outline='none'
					boxShadow='none !important'
					onClick={onOpen}
				>
					Create Room +
				</Button>
			</Box>
			<NewChatDialog {...{ isOpen, onClose }} />
		</>
	)
}
