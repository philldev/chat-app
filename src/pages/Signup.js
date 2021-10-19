import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Text, VStack } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'

export const SignupPage = () => {
	return (
		<Box w='full' h='full' display='grid' placeItems='center'>
			<Box maxW='sm' w='full' p='2'>
				<Text fontSize='2xl' fontWeight='bold' textAlign='center' mb='4'>
					Signup
				</Text>
				<VStack spacing='2' mb='4'>
					<Input
						bg='slate.200'
						border='none'
						placeholder='Email'
						type='email'
					/>
					<Input
						bg='slate.200'
						border='none'
						placeholder='Username'
						type='text'
					/>
					<Input
						bg='slate.200'
						border='none'
						placeholder='Password'
						type='password'
					/>
				</VStack>
				<Button colorScheme='slate' w='full' mb='2'>
					Create Account
				</Button>
				<Text color='slate.800'>
					Have an account? {" "}
					<Text as={Link} color='blue.500' to='/login'>
						Login
					</Text>
				</Text>
			</Box>
		</Box>
	)
}
