import React, { useState } from "react";

function Transaction() {
	const [transactionName, setTransactionName] = useState('');
	const [transactionAmount, setTransactionAmount] = useState(0);
	const [transactions, setTransactions] = useState([]);

	const callApi = (req) => {
		fetch(req)
			.then(response => response.json())
			.then(txns => {
				console.log(txns);
				setTransactions(txns)
			})
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			transaction: {
			  name: transactionName,
			  amount: transactionAmount
			}
		}

		fetch('http://localhost:3000/api/v1/transactions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': localStorage.getItem('token')
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
			  	name='transactionName'
			    placeholder='I spent on...'
			  	value={transactionName}
			  	onChange={e => setTransactionName(e.target.value)}
			  >
			  </input>
			  <input
			  	type='text'
			  	name='transactionAmount'
			    placeholder='For RM...'
					value={transactionAmount > 0 ? transactionAmount : ''}
			  	onChange={e => setTransactionAmount(e.target.value)}
			  >
			  </input>
			  <input
					type='submit'
					value='Add Transaction'
			  />
			</form>
			<button
				onClick={() => callApi('http://localhost:3000/api/v1/transactions')}
			>
			  My Transactions
			</button>
			<div>
				<ul>
					{transactions.map(txn => <li key={txn.id}>{txn.name}: {txn.amount}</li>)}
				</ul>
			</div>
		</div>
	)
}

export default Transaction;
