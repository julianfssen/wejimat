import React, { useState, useEffect } from "react";

function Transaction() {
	const [transactionName, setTransactionName] = useState('');
	const [transactionAmount, setTransactionAmount] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const [paymentChannels, setPaymentChannels] = useState([]);
	const [selectedPaymentChannel, setSelectedPaymentChannel] = useState('');

	const callApi = (req) => {
		fetch(req, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': localStorage.getItem('token')
			}
		})
			.then(response => response.json())
			.then(txns => {
				setTransactions(txns)
			})
	}

	const fetchPaymentChannels = () => {
		fetch('http://localhost:3000/api/v1/payment_channels', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': localStorage.getItem('token')
			}
		})
			.then(response => response.json())
			.then(response => {
				setPaymentChannels([...response.channels])
			})
	}

	useEffect(() => fetchPaymentChannels(), []);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			transaction: {
			  name: transactionName,
			  amount: transactionAmount,
				payment_channel: selectedPaymentChannel
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
				<select
					name='paymentChannels'
					onChange={e => setSelectedPaymentChannel(e.target.value)}
				>
					{paymentChannels.map(channel => <option value={channel} key={channel}>{channel}</option>)}
				</select>
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
