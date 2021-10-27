import * as React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../../firebase/AuthContext'
import { useDisclosure } from '@chakra-ui/hooks'
import { useForm } from 'react-hook-form'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { SearchIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router'

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
	const [usernameDisabled, setUsernameDisabled] = React.useState(true)
	const toggleUsernameDisabled = () => setUsernameDisabled((p) => !p)
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

				<SearchBox />
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
									disabled={usernameDisabled}
									{...register('username', { required: true })}
								/>
								<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
									{errors.username?.message}
								</Text>
								{/* <Button variant='link' fontSize='xs' mt='1' color='slate.900' alignSelf='flex-end' onClick={toggleUsernameDisabled} >{ usernameDisabled ? "Change username" : "Cancel"}</Button> */}
							</VStack>
							<VStack spacing='1' alignItems='flex-start' w='full'>
								<Text fontSize='sm'>Email</Text>
								<Input
									bg='slate.200'
									border='none'
									placeholder='Email'
									disabled
									{...register('email', { required: true })}
								/>
								<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
									{errors.email?.message}
								</Text>
							</VStack>
						</VStack>
						<Button colorScheme='red' variant='link' onClick={signout}>
							Sign Out
						</Button>
					</ModalBody>
					<ModalFooter justifyContent='center'>
						{/* <Button colorScheme='slate' type='submit' {...{ isLoading }}>
							Update Profile
						</Button> */}
						<Button colorScheme='slate' onClick={onClose}>
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
		if(roomId) {
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
