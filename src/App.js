import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import logo from './logo.svg';
import './App.css';
import SetupPassPhraseNewAccount from './component/SetupPassPhraseNewAccount';
import RecoverAccount from './component/RecoverAccount';

function App() {
	
	const [isLogged, setIsLogged] = useState(false);

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Home isLogged={isLogged} setIsLogged={setIsLogged} />
				</Route>
				<Route path="/setup-passphrase-new-account">
					<SetupPassPhraseNewAccount isLogged={isLogged} setIsLogged={setIsLogged} />
				</Route>
				<Route path="/recover-account">
					<RecoverAccount />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
