import './MessageList.scss'

export const MessageList = () => {
	return (
		<div className='message-list-wrapper'>
			<div className='message-list'>
				{new Array(10).fill(0).map((i) => (
					<div className='message-item-wrapper '>
						<div className='message-item'>
							<div className='message-item__avatar'></div>
							<div className='message-item__info'>
								<span className='message-item__user'>john</span>
								<span className='message-item__text'>
									lorem100Lorem ipsum dolor sit amet, consectetur adipiscing
									elit, sed do eiusmod tempor incididunt ut labore et dolore
									magna aliqua.
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
