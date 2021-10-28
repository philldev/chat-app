import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { CopyIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import {
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
import { useAuth } from '../../../firebase/AuthContext'
import { ChatErrorType, useChat } from '../Chat'

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
				<Button as={Link} to='/' colorScheme='slate'>
					Back
				</Button>
			)}
		</Flex>
	)
}

const ChatSettings = ({ isOpen, onClose }) => {
	const { chat } = useChat()
	const { user } = useAuth()
	const isAdmin = user?.id === chat.ownerId
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent mx='2' bg='slate.100' color='slate.900'>
				<ModalHeader>
					<Flex alignItems='center'>
						<Box mr='4'>
							<Avatar
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
						<VStack spacing='2' alignItems='stretch'>
							{isAdmin && <Button colorScheme='slate'>Change Room Name</Button>}
							<Button colorScheme='slate'>Leave Room</Button>
							{isAdmin && <Button colorScheme='red'>Delete Room</Button>}
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
						{chat?.roomUsers.map((item, index) => (
							<Flex alignItems='center'>
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
					</Flex>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
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
