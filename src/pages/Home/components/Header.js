import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { SearchIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/modal'
import * as React from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../../../context/AuthContext'

export const Header = () => {
	const { signout, user } = useAuth()
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Flex
				p='4'
				borderBottom='1px solid'
				borderColor='slate.500'
				justifyContent='space-between'
			>
				<Flex onClick={onOpen} alignItems='center'>
					<Box as='button' mr='4'>
						<Avatar
							size='sm'
							borderRadius='4'
							name={user.username}
							src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
						/>
					</Box>
					<Text color='slate.900' fontWeight='bold'>
						{user.username.toUpperCase()}
					</Text>
				</Flex>

				<SearchBox />
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent as='form' mx='2' bg='slate.100' color='slate.900'>
					<ModalHeader>Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing='3' mb='4'>
							<VStack spacing='1' alignItems='flex-start' w='full'>
								<Flex justifyContent='center' w='full' mb='4'>
									<Avatar
										size='lg'
										borderColor='slate.500'
										borderWidth='2px'
										borderStyle='solid'
										boxShadow='xl'
										borderRadius='4'
										name={user.username}
										src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
									/>
								</Flex>
								<Text color='slate.800' fontSize='sm'>
									Username
								</Text>
								<Text>{user.username}</Text>
							</VStack>
							<VStack spacing='1' alignItems='flex-start' w='full'>
								<Text color='slate.800' fontSize='sm'>
									Email
								</Text>
								<Text>{user.email}</Text>
							</VStack>
						</VStack>
						<Button colorScheme='red' variant='link' onClick={signout}>
							Sign Out
						</Button>
					</ModalBody>
					<ModalFooter justifyContent='center'>
						<Button onClick={onClose}>
							Back
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

const SearchBox = () => {
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
