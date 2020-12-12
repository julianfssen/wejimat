import React from 'react';
import Transaction from './components/Transaction';
import User from './components/User';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

function App() {
  return (
		<Router>
			<div className='App'>
			  <ul>
			  	<li>
			  		<Link to='/'>
			  			Transactions
			  		</Link>
			  	</li>
			  	<li>
			  		<Link to='/login'>
			  			Profile
			  		</Link>
			  	</li>
			  </ul>
			  <Switch>
			  	<Route exact path='/'>
		        <Transaction />
			  	</Route>
			  	<Route path='/login'>
			  		<User />
			  	</Route>
			  </Switch>
			</div>
		</Router>
  );
}

export default App;
