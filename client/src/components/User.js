import React, { useState } from "react";
import {
	Redirect
} from 'react-router-dom';


function User() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signupSuccess, setSignupSuccess] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			user: {
			  username,
			  email,
			  password
			}
		}

		fetch('http://localhost:3000/api/v1/users', {
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
				setSignupSuccess(true);
			});
	}

	if (signupSuccess) {
		return <Redirect to='/' />
	} else {
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
}

export default User;
