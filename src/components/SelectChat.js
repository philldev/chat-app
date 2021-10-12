import './SelectChat.scss'

export const SelectChat = () => {
	return (
		<div className='select-chat__wrapper'>
			<div className='select-chat__new'>
				<button className='btn'>New Chat</button>
			</div>
			<p>or</p>
			<div className='select-chat__join'>
				<input  className='input' placeholder='enter chat id'/>
				<button className='btn'>Join</button>
			</div>
		</div>
	)
}
