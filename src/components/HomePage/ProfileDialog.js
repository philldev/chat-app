import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Flex, Text, VStack } from '@chakra-ui/layout'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { useAuth } from '../../context/AuthContext'

export const ProfileDialog = ({ isOpen, onClose }) => {
	const { user, signout } = useAuth()
	return (
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
					<Button onClick={onClose}>Back</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
