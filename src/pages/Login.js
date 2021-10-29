import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Text, VStack } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const schema = yup
	.object({
		email: yup.string().required('Email is required.').email('Email is invalid.'),
		password: yup
			.string()
			.required('Password is required')
			.min(6, 'Password cannot be longer than 6 characters.'),
	})
	.required()

export const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	const { signin } = useAuth()

	const [authErr, setAuthErr] = useState(null)

	const onSubmit = async (data) => {
		setAuthErr(null)
		try {
			await signin(data)
		} catch (error) {
			const errCode = error.code
			if (
				errCode === 'auth/user-not-found' ||
				errCode === 'auth/wrong-password'
			) {
				setAuthErr('Incorrect email or password.')
			}
		}
	}

	return (
		<Box w='full' h='full' display='grid' placeItems='center'>
			<Box as='form' onSubmit={handleSubmit(onSubmit)} maxW='sm' w='full' p='2'>
				<Text fontSize='2xl' fontWeight='bold' textAlign='center' mb='4'>
					Login
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
					Login
				</Button>
				<Text color='red.300' fontSize='xs' mt='1' textAlign='right'>
					{authErr}
				</Text>
				<Text color='slate.800'>
					Don't have an account?{' '}
					<Text as={Link} color='blue.500' to='/signup'>
						Signup
					</Text>{' '}
				</Text>
			</Box>
		</Box>
	)
}
