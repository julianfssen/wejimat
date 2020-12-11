import React, { useState } from "react";

function Transaction() {
	const [textInput, setTextInput] = useState('');
	const [transactions, setTransactions] = useState([]);

	const callApi = (req) => {
		fetch(req)
			.then(response => response.json())
			.then(txns => setTransactions(txns))
	}
	
	const handleSubmit = (e) => {
		const data = {
			name: textInput,
			amount: 5.50
		}

		e.preventDefault();
		fetch('http://localhost:3000/api/v1/transactions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	}

	return (
		<div>
			<h1>What did you spend on?</h1>
			<form onSubmit={e => handleSubmit(e)}>
			  <input
			  	type='text'
			  	name='transaction'
			    placeholder='I spent on...'
			  	value={textInput}
			  	onChange={e => setTextInput(e.target.value)}
			  >
			  </input>
			  <button
					type='button'
					value='summit'
			  >
			    Add
			  </button>
			  <button
			  	onClick={() => callApi('http://localhost:3000/api/v1/transactions')}
			  >
			    My transactions
			  </button>
			</form>
			<div>
				<ul>
					{transactions.map(txn => <li key={txn.id}>{txn.name}</li>)}
				</ul>
			</div>
		</div>
	)
}

export default Transaction;
