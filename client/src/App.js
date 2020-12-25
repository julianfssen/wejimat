import React, { useState, useEffect } from 'react';
import Transaction from './components/Transaction';
import UserAuth, { checkLoggedIn, handleLogout } from './components/User';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

function App() {
  const [loggedIn, setLogin] = useState(false);

  useEffect(() => setLogin(checkLoggedIn()), []);

  return (
		<Router>
			<div className='App'>
			  <ul>
			  	<li>
			  		<Link to='/'>
			  			Transactions
			  		</Link>
			  	</li>
          {!loggedIn &&
			  	  <li>
			  	  	<Link to='/login'>
			  	  		Login
			  	  	</Link>
			  	  </li>
          }
          {!loggedIn &&
			  	  <li>
			  	  	<Link to='/signup'>
			  	  		Signup
			  	  	</Link>
			  	  </li>
          }
          {loggedIn &&
			  	  <li>
			  	  	<Link 
                to='/logout'
                onClick={() => handleLogout()}
              >
			  	  		Logout
			  	  	</Link>
			  	  </li>
          }
			  </ul>
			  <Switch>
			  	<Route exact path='/'>
		        <Transaction />
			  	</Route>
			  	<Route path='/login'>
			  		<UserAuth login={true} />
			  	</Route>
			  	<Route path='/signup'>
			  		<UserAuth login={false} />
			  	</Route>
			  	<Route path='/logout'>
			  		<UserAuth login={true} />
			  	</Route>
			  </Switch>
			</div>
		</Router>
  );
}

export default App;
