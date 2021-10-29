import { Avatar } from '@chakra-ui/avatar'
import { Input } from '@chakra-ui/input'
import * as React from 'react'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { CopyIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { useToast } from '@chakra-ui/toast'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { ChatErrorType, useChat } from '../../../context/ChatPageContext'

export const ChatHeader = () => {
	const { chat, error, isLoading } = useChat()
	const {
		isOpen: isChatSettingsOpen,
		onOpen: onChatSettingsOpen,
		onClose: onChatSettingsClose,
	} = useDisclosure()
	return (
		<Flex
			p='4'
			borderBottom='1px solid'
			borderColor='slate.500'
			justifyContent='space-between'
			alignItems='center'
			h='20'
		>
			{chat && (
				<>
					<Flex alignItems='center'>
						<Box as='button' mr='4' onClick={onChatSettingsOpen}>
							<Avatar
								size='sm'
								borderRadius='4'
								name='chat'
								src={`https://avatars.dicebear.com/api/identicon/${chat?.name}.svg`}
							/>
						</Box>
						<Box>
							<Text color='slate.900' fontWeight='bold' fontSize='xl'>
								{chat?.name}
							</Text>
							{chat?.id && <RoomChatId chatId={chat.id} />}
						</Box>
					</Flex>
					<ChatSettings
						isOpen={isChatSettingsOpen}
						onClose={onChatSettingsClose}
					/>
				</>
			)}
			{error === ChatErrorType.notExist && <Text>Chat Room not found!</Text>}
			{!isLoading && (
				<Button as={Link} to='/'>
					Back
				</Button>
			)}
		</Flex>
	)
}

const ChatSettings = ({ isOpen, onClose }) => {
	const { chat, changeChatName } = useChat()
	const { user } = useAuth()
	const isAdmin = user?.id === chat.ownerId
	const [isChangingName, setIsChangingName] = React.useState(false)
	const toggleIsChangingName = () => setIsChangingName((p) => !p)
	const [newNameValue, setNewNameValue] = React.useState('')
	const onNewNameValueChange = (e) => setNewNameValue(e.target.value)
	const handleChangeClick = async () => {
		await changeChatName(newNameValue)
		toggleIsChangingName()
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent mx='2' bg='slate.100' color='slate.900'>
				<ModalHeader>
					<Flex alignItems='center'>
						<Box mr='4'>
							<Avatar
								borderRadius='4'
								name='chat'
								src={`https://avatars.dicebear.com/api/identicon/${chat?.name}.svg`}
							/>
						</Box>
						<Box>
							<Text color='slate.900' fontWeight='bold' fontSize='xl'>
								{chat?.name}
							</Text>
							{chat?.id && <RoomChatId chatId={chat.id} />}
						</Box>
					</Flex>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex flexDir='column' mb='4'>
						<Text mb='2' color='slate.800'>
							Room Settings :
						</Text>
						<VStack spacing='3' alignItems='stretch'>
							{isChangingName && (
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
									<Button
										onClick={toggleIsChangingName}
										colorScheme='slate'
										w='full'
									>
										Cancel
									</Button>
								</Box>
							)}
							{isAdmin && !isChangingName && (
								<Button onClick={toggleIsChangingName}>Change Room Name</Button>
							)}
							<Button>Leave Room</Button>
							{isAdmin && <DeleteRoomBtn />}
						</VStack>
					</Flex>
					<Flex flexDir='column' mb='4'>
						<Text mb='2' color='slate.800'>
							Room Admin :
						</Text>
						<Flex alignItems='center'>
							<Avatar
								size='xs'
								mr='2'
								src={`https://avatars.dicebear.com/api/identicon/${chat?.admin?.username}.svg`}
							/>
							<Text fontWeight='bold'>
								{chat?.admin?.username}{' '}
								{chat?.ownerId === user?.id ? (
									<Text as='span' color='slate.800' fontSize='sm'>
										- You
									</Text>
								) : null}
							</Text>
						</Flex>
					</Flex>
					<Flex flexDir='column' mb='4'>
						<Text mb='2' color='slate.800'>
							Room Users :
						</Text>

						<VStack spacing='2' alignItems='stretch'>
							{chat?.roomUsers?.map((item, index) => (
								<Flex alignItems='center' key={index}>
									<Avatar
										size='xs'
										mr='2'
										src={`https://avatars.dicebear.com/api/identicon/${item?.username}.svg`}
									/>
									<Text fontWeight='bold'>
										{item?.username}{' '}
										{item?.id === user?.id ? (
											<Text as='span' color='slate.800' fontSize='sm'>
												- You
											</Text>
										) : null}
									</Text>
								</Flex>
							))}
						</VStack>
					</Flex>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	)
}

const DeleteRoomBtn = () => {
	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const { deleteChat } = useChat()
	const onDelete = async () => {
		await deleteChat()
	}
	const cancelRef = React.useRef()
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

const RoomChatId = ({ chatId }) => {
	const toast = useToast()
	const copyRoomIdToClipboard = () => {
		navigator.clipboard.writeText(chatId)
		toast({
			title: 'Room id copied',
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
	}
	return (
		<Text
			cursor='pointer'
			onClick={copyRoomIdToClipboard}
			title='Copy room id'
			color='slate.900'
			fontSize='sm'
		>
			Room ID : {chatId} <CopyIcon />
		</Text>
	)
}
