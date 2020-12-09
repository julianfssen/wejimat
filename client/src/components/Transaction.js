import React, { useState } from "react";

function Transaction() {
	const [textInput, setTextInput] = useState('');
	const [transactions, setTransactions] = useState([]);

	const callApi = (req) => {
		fetch(req)
			.then(response => response.json())
			.then(txns => setTransactions(txns))
	}

	return (
		<div>
			<h1>What did you spend on?</h1>
			<button>Add</button>
			<button
				onClick={() => callApi('http://localhost:3000/api/v1/transactions')}
			>
			  My transactions
			</button>
			<div>
				<ul>
					{transactions.map(txn => <li key={txn.id}>{txn.name}</li>)}
				</ul>
			</div>
		</div>
	)
}

export default Transaction;
