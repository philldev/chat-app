import {
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	Timestamp,
	updateDoc,
	where,
} from '@firebase/firestore'
import { db } from '../firebase'
import { createId } from '../utils/createId'
import usersCollection from './user'

const CHATS_COLLECTION = 'chats'

const Users = usersCollection()

export default function chatsCollection() {
	const createChat = async ({ ownerId, name, usersId = [] }) => {
		const chat = {
			id: createId(),
			ownerId,
			name,
			usersId: [ownerId, ...usersId],
			messages: [],
		}
		try {
			await setDoc(doc(db, CHATS_COLLECTION, chat.id), chat)
			return chat
		} catch (error) {
			throw error
		}
	}

	const getChat = async ({ chatId }) => {
		try {
			let chat = {}
			const docRef = doc(db, CHATS_COLLECTION, chatId)
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				let chatData = docSnap.data()
				let admin = await Users.getUser(chatData.ownerId)
				let usersId = chatData.usersId
				let chatUsers = []
				usersId.forEach(async (userId) => {
					let user = await Users.getUser(userId)
					if (user) {
						chatUsers.push(user)
					}
				})
				chat = { ...chatData, admin, roomUsers: chatUsers }
				return chat
			} else {
				throw new Error('no-chat-found')
			}
		} catch (error) {
			throw error
		}
	}

	const getUsersChats = async ({ user }) => {
		const q = query(
			collection(db, CHATS_COLLECTION),
			where('usersId', 'array-contains', user.id)
		)
		try {
			const querySnap = await getDocs(q)
			let chats = []
			querySnap.forEach((d) => {
				chats = [...chats, d.data()]
			})
			return chats
		} catch (error) {
			throw error
		}
	}

	const getUnReadMessagesCount = async ({
		user,
		chatId,
		chatUsersLastSeen,
	}) => {
		if (chatUsersLastSeen?.[user.id]) {
			let userLastSeen = chatUsersLastSeen?.[user.id]
			let q = query(
				collection(db, CHATS_COLLECTION, chatId, 'messages'),
				where('createdAt', '>', userLastSeen),
				limit(10)
			)
			try {
				const querySnap = await getDocs(q)
				const unreadMessagesCount = querySnap.size
				return unreadMessagesCount
			} catch (error) {
				throw error
			}
		}
	}

	const joinChat = async ({ chatId, userId }) => {
		const docRef = doc(db, CHATS_COLLECTION, chatId)
		try {
			await updateDoc(docRef, {
				usersId: arrayUnion(userId),
			})
		} catch (error) {
			throw error
		}
	}

	const updateChatName = async ({ name, chatId }) => {
		try {
			let chatRef = doc(db, 'chats', chatId)
			await updateDoc(chatRef, { name })
		} catch (error) {
			throw error
		}
	}

	const deleteChat = async ({ chatId }) => {
		try {
			let chatRef = doc(db, 'chats', chatId)
			await deleteDoc(chatRef)
		} catch (error) {
			throw error
		}
	}

	const updateUserLastSeen = async ({ userId, chatId }) => {
		try {
			let chatRef = doc(db, 'chats', chatId)
			await updateDoc(chatRef, {
				[`usersLastSeen.${userId}`]: Timestamp.now().toMillis(),
			})
		} catch (error) {
			throw error
		}
	}

	const onMessagesSnapshot = (callback, { chatId }) => {
		const q = query(
			collection(db, 'chats', chatId, 'messages'),
			orderBy('createdAt', 'asc')
		)
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const messagesDocs = []
			querySnapshot.forEach((doc) => {
				messagesDocs.push(doc.data())
			})
			callback(messagesDocs)
		})
		return unsubscribe
	}

	const addMessage = async ({content, user, chatId}) => {
		if (content) {
			const message = {
				id: createId(),
				from: user.username,
				content: content,
				createdAt: Timestamp.now().toMillis(),
			}
			await setDoc(doc(db, 'chats', chatId, 'messages', message.id), message)
			try {
			} catch (error) {
				console.log(error.code)
			}
		}
	}

	return {
		addMessage,
		onMessagesSnapshot,
		updateUserLastSeen,
		deleteChat,
		updateChatName,
		joinChat,
		createChat,
		getUsersChats,
		getUnReadMessagesCount,
		getChat,
	}
}
