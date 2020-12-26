import React, { useState } from "react";
import {
	Redirect
} from 'react-router-dom';

const USER_TOKEN = localStorage.getItem('token');

export function checkLoggedIn() {
  if (USER_TOKEN) {
    return true
  } else {
    return false
  }
}

export function handleLogout() {
  localStorage.removeItem('token');

  return true;
}

function UserAuth({ login, onAuthChange }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [authSuccess, setAuthSuccess] = useState(false);

  const handleAuthSuccess = (success) => {
    setAuthSuccess(success);
  }

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			user: {
			  username,
			  email,
			  password
			}
		}

    const url = login ? 'http://localhost:3000/api/v1/login' : 'http://localhost:3000/api/v1/users'

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => response.json())
			.then(data => {
				localStorage.setItem('token', data.token);
        handleAuthSuccess(true);
			});
	}

  function LoginForm() {
    return (
  	  <div>
  	  	<form onSubmit={e => handleSubmit(e)}>
  	  		<input
  	  		  placeholder='Username' 
  	  		  value={username}
  	  			onChange={e => setUsername(e.target.value)}
  	  		/>
  	  		<input
  	  			type='password'
  	  		  placeholder='Password'
  	  		  value={password}
  	  			onChange={e => setPassword(e.target.value)}
  	  		/>
  	  		<input type='submit' value='Login'/>
  	  	</form>
  	  </div>
    )
  }
  
  function SignupForm() {
    return (
  	  <div>
  	  	<form onSubmit={e => handleSubmit(e)}>
  	  		<input
  	  		  placeholder='Username' 
  	  		  value={username}
  	  			onChange={e => setUsername(e.target.value)}
  	  		/>
  	  		<input
  	  			placeholder='Email' 
  	  		  value={email}
  	  			onChange={e => setEmail(e.target.value)}
  	  		/>
  	  		<input
  	  			type='password'
  	  		  placeholder='Password'
  	  		  value={password}
  	  			onChange={e => setPassword(e.target.value)}
  	  		/>
  	  		<input type='submit' value='Signup'/>
  	  	</form>
  	  </div>
    )
  }

	if (authSuccess) {
		return <Redirect to={{
        pathname: '/',
        state: { loggedIn: authSuccess }
      }}
    />
	} else {
	  return login ? <LoginForm /> : <SignupForm />
	}
}

export default UserAuth;
