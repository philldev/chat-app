import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
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
import * as React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useChat } from '../../context/ChatPageContext'
import { ChangeChatRoomName } from './ChangeChatRoomName'
import { DeleteRoomButton } from './DeleteRoomButton'
import { RoomChatId } from './RoomChatId'

export const ChatRoomSettings = ({ isOpen, onClose }) => {
	const { chat } = useChat()
	const { user } = useAuth()
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
							<ChangeChatRoomName />
							<Button>Leave Room</Button>
							<DeleteRoomButton />
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
