import * as React from 'react'
import { Button } from '@chakra-ui/button'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
} from '@chakra-ui/modal'
import { useChat } from '../../context/ChatContext'

export const DeleteRoomButton = () => {
	const { deleteChat, isAdmin } = useChat()
	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const onDelete = async () => {
		await deleteChat()
	}
	const cancelRef = React.useRef()
	if (!isAdmin) return null
	return (
		<>
			<Button colorScheme='red' onClick={onOpen}>
				Delete Room
			</Button>
			<AlertDialog
				isCentered
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent mx='2' bg='slate.100' color='slate.900'>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Room
						</AlertDialogHeader>
						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='red' onClick={onDelete} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}
