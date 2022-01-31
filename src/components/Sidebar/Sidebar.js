import React, { useState, useEffect } from 'react';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleIcon from '@mui/icons-material/People';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import SidebarOption from './SidebarOption';
import './Sidebar.css';
import db from './../../firebase';
import { useStateValue } from '../../reducer/StateProvider';

export default function Sidebar() {
	const [channels, setChannels] = useState([]);
	const [{ user }] = useStateValue();

	useEffect(() => {
		//Run this when the sidebar component loads
		db.collection('rooms').onSnapshot((snapshot) => {
			setChannels(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
				}))
			);
		});
	});

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<div className='sidebar__info'>
					<h2>Boo Coder</h2>
					<h3>
						<FiberManualRecordIcon />
						{user?.displayName}
					</h3>
				</div>
				<CreateIcon />
			</div>
			<SidebarOption Icon={InsertCommentIcon} title='Threads' />
			<SidebarOption Icon={InboxIcon} title='Mentions & reactions' />
			<SidebarOption Icon={DraftsIcon} title='Saved items' />
			<SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
			<SidebarOption Icon={PeopleIcon} title='People & user groups' />
			<SidebarOption Icon={AppsIcon} title='Apps' />
			<SidebarOption Icon={FileCopyIcon} title='File browser' />
			<SidebarOption Icon={ExpandLessIcon} title='Show less' />
			<hr />
			<SidebarOption Icon={ExpandMoreIcon} title='Channels' />
			<hr />
			<SidebarOption
				Icon={AddIcon}
				title='Add Channel'
				addChannelOption={true}
			/>
			{channels.map(({ name, id }, index) => (
				<SidebarOption key={`${id}_${index}`} title={name} id={id} />
			))}
		</div>
	);
}
