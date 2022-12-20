import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import logo from './logo.svg';
import './App.css';
import SetupPassPhraseNewAccount from './component/SetupPassPhraseNewAccount';
import RecoverAccount from './component/RecoverAccount';

function App() {
	

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/setup-passphrase-new-account">
					<SetupPassPhraseNewAccount />
				</Route>
				<Route path="/recover-account">
					<RecoverAccount />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
