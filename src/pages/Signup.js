import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Text, VStack } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const schema = yup
	.object({
		email: yup.string().required('Email is required').email('Email is invalid'),
		username: yup
			.string()
			.required('Username is required')
			.min(1, 'Username must be longer than 1 character')
			.max(25, 'Username cannot be longer than 25 characters'),
		password: yup
			.string()
			.required('Password is required')
			.min(6, 'Password cannot be longer than 6 characters'),
	})
	.required()

export const SignupPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(schema),
	})
	const { signup } = useAuth()
	const history = useHistory()
	const onSubmit = async (data) => {
		try {
			await signup(data)
			history.push('/')
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				setError(
					'email',
					{ message: 'Email already in use' },
					{ shouldFocus: true }
				)
			}
		}
	}
	return (
		<Box w='full' h='full' display='grid' placeItems='center'>
			<Box as='form' onSubmit={handleSubmit(onSubmit)} maxW='sm' w='full' boxShadow='2xl' >
				<Text fontSize='2xl' fontWeight='bold' textAlign='center' mb='4'>
					Signup
				</Text>
				<VStack spacing='2' mb='4'>
					<Box w='full'>
						<Input
							bg='slate.200'
							border='none'
							placeholder='Email'
							type='email'
							{...register('email')}
						/>
						<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
							{errors.email?.message}
						</Text>
					</Box>
					<Box w='full'>
						<Input
							bg='slate.200'
							border='none'
							placeholder='Username'
							type='text'
							{...register('username')}
						/>
						<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
							{errors.username?.message}
						</Text>
					</Box>
					<Box w='full'>
						<Input
							bg='slate.200'
							border='none'
							placeholder='Password'
							type='password'
							{...register('password')}
						/>
						<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
							{errors.password?.message}
						</Text>
					</Box>
				</VStack>
				<Button type='submit' w='full' mb='2'>
					Create Account
				</Button>
				<Text color='slate.800'>
					Have an account?{' '}
					<Text as={Link} color='blue.500' to='/login'>
						Login
					</Text>
				</Text>
			</Box>
		</Box>
	)
}
