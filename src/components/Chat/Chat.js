import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoIcon from '@mui/icons-material/Info';
import db from '../../firebase';
import Message from '../Message/Message';
import ChatInput from '../ChatInput/ChatInput';

export default function Chat() {
	const { roomId } = useParams();
	const [roomDetails, setroomDetails] = useState(null);
	const [roomMessages, setRoomMessages] = useState([]);
	useEffect(() => {
		if (roomId) {
			db.collection('rooms')
				.doc(roomId)
				.onSnapshot((snapshot) => setroomDetails(snapshot.data()));
		}
		db.collection('rooms')
			.doc(roomId)
			.collection('messages')
			.orderBy('timestamp', 'asc')
			.onSnapshot((snapshot) =>
				setRoomMessages(snapshot.docs.map((doc) => doc.data()))
			);
	}, [roomId]);
	return (
		<div className='chat'>
			<div className='chat__header'>
				<div className='chat__headerLeft'>
					<h4 className='chat__channelName'>
						<strong>#{roomDetails?.name}</strong>
						<StarOutlineIcon />
					</h4>
				</div>
				<div className='chat__headerRight'>
					<p>
						<InfoIcon />
						Details
					</p>
				</div>
			</div>
			<div className='chat__messages'>
				{roomMessages.map(
					({ message, timestamp, user, userImage }, index) => (
						<Message
							key={`${user}_${index}`}
							message={message}
							timestamp={timestamp}
							user={user}
							userImage={userImage}
						/>
					)
				)}
			</div>
			<ChatInput channelName={roomDetails?.name} channelId={roomId} />
		</div>
	);
}
