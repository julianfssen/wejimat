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
			username,
			email,
			password
		}

		console.log('request data', data);

		fetch('http://localhost:3000/api/v1/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (response.ok) {
					response = response.json();
					localStorage.setItem('token', response.token);
					setSignupSuccess(true);
				} else {
					console.log('fail', response);
				}
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
