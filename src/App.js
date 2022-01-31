import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import { useStateValue } from './reducer/StateProvider';

function App() {
	const [{ user }] = useStateValue();
	return (
		<div className='App'>
			<Router>
				{!user ? (
					<Login />
				) : (
					<>
						<Header />
						<div className='app__body'>
							<Sidebar />
							<Routes>
								<Route
									path='/room/:roomId'
									element={<Chat />}
								/>
								<Route path='/' element={<h1>Welcome</h1>} />
							</Routes>
						</div>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
