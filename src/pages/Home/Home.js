import { Flex } from '@chakra-ui/layout'
import { useWindowWidth } from '@react-hook/window-size'
import { ChatList } from '../../components/HomePage/ChatList'
import { HomeHeader } from '../../components/HomePage/HomeHeader'
import { NewChatButton } from '../../components/HomePage/NewChatButton'
import { HomeDesktop } from '../../components/HomePageDesktop/HomeDesktop'
import { HomeDesktopProvider } from '../../context/HomeDesktopContext'

export const HomePage = () => {
	const wWidth = useWindowWidth()
	if (wWidth > 768)
		return (
			<HomeDesktopProvider>
				<HomeDesktop />
			</HomeDesktopProvider>
		)
	return (
		<Flex
			flexDir='column'
			borderRightColor={{ base: 'none', md: 'slate.500' }}
			borderRightWidth={{ base: 'none', md: '1px' }}
			borderRightStyle={{ base: 'none', md: 'solid' }}
			w={{ base: '100%', md: '35%' }}
			h='full'
			justifySelf='flex-start'
		>
			<HomeHeader />
			<ChatList />
			<NewChatButton />
		</Flex>
	)
}
