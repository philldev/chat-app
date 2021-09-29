import Message from "./message";
import User from "./user";

interface Chat {
	id: string
	messages : Message[]
	users: User[];
}

export default Chat
