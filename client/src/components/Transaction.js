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
		e.preventDefault();
		console.log(textInput);
	}

	return (
		<div>
			<h1>What did you spend on?</h1>
			<form onSubmit={handleSubmit}>
			  <input
			  	type='text'
			  	name='transaction'
			    placeholder='I spent on...'
			  	value={textInput}
			  	onChange={e => setTextInput(e.target.value)}
			  >
			  </input>
			  <button
					type='submit'
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
