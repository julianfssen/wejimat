import React, { useState } from "react";

function Transaction() {
	const [textInput, setTextInput] = useState('');
	const [transactions, setTransactions] = useState([]);

	const callApi = (req) => {
		fetch(req)
			.then(response => response.json())
			.then(txns => txns.map(txn => setTransactions([...transactions, {txn}])))
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
					{transactions.map(txn => <li key={txn.txn.id}>{txn.txn.name}</li>)}
				</ul>
			</div>
		</div>
	)
}

export default Transaction;
