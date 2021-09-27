import type { NextPage } from 'next'
import Head from 'next/head'
import AccountMenu from '../components/account-menu'
import Chat from '../components/chat'
import ChatList from '../components/chat-list/chat-list'
import AppContainer from '../components/layout/app-container'
import AppLayout from '../components/layout/app-layout'
import Sidebar from '../components/layout/sidebar'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<AppLayout>
				<AppContainer>
					<Sidebar>
						<AccountMenu />
						<ChatList />
					</Sidebar>
					<Chat />
				</AppContainer>
			</AppLayout>
		</>
	)
}

export default Home
