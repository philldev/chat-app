import * as React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../../firebase/AuthContext'
import { useDisclosure } from '@chakra-ui/hooks'
import { useForm } from 'react-hook-form'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

const schema = yup.object({
	email: yup.string().required('Email is required').email('Email is invalid'),
	username: yup
		.string()
		.required('Username is required')
		.min(1, 'Username must be longer than 1 character')
		.max(25, 'Username cannot be longer than 25 characters'),
})

export const Header = () => {
	const { signout, user } = useAuth()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			username: user.username,
			email: user.email,
		},
	})
	const [isLoading, setIsLoading] = React.useState(false)
	const onSubmit = (data) => {}
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
							name={user.username}
							src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
						/>
					</Box>
					<Text color='slate.900' fontWeight='bold'>
						{user.username.toUpperCase()}
					</Text>
				</Flex>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent
					as='form'
					mx='2'
					bg='slate.100'
					color='slate.900'
					onSubmit={handleSubmit(onSubmit)}
				>
					<ModalHeader>Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing='2' mb='4'>
							<VStack spacing='1' alignItems='flex-start' w='full'>
								<Text fontSize='sm'>Username</Text>
								<Input
									bg='slate.200'
									border='none'
									placeholder='Username'
									{...register('username', { required: true })}
								/>
								<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
									{errors.username?.message}
								</Text>
							</VStack>
							<VStack spacing='1' alignItems='flex-start' w='full'>
								<Text fontSize='sm'>Email</Text>
								<Input
									bg='slate.200'
									border='none'
									placeholder='Email'
									{...register('email', { required: true })}
								/>
								<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
									{errors.email?.message}
								</Text>
							</VStack>
						</VStack>
						<Button colorScheme='red' onClick={signout}>
							Sign Out
						</Button>
					</ModalBody>
					<ModalFooter justifyContent='center'>
						<Button colorScheme='slate' mr={3} type='submit' {...{ isLoading }}>
							Update Profile
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
