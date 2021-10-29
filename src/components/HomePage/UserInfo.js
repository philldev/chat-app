import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { useAuth } from '../../context/AuthContext'

export const UserInfo = (props) => {
	const { user } = useAuth()
	return (
		<Flex alignItems='center' {...props}>
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
	)
}
