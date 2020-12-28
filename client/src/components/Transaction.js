import React, { useState, useEffect } from "react";

function Transaction() {
	const [transactionName, setTransactionName] = useState('');
	const [transactionAmount, setTransactionAmount] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const [paymentChannels, setPaymentChannels] = useState([]);
	const [selectedPaymentChannel, setSelectedPaymentChannel] = useState('Boost');
	const [transactionsByChannel, setPaymentChannelToView] = useState('');

	const MONTHS = [
	  'January',
	  'February',
	  'March',
	  'April',
	  'May',
	  'June',
	  'July',
	  'August',
	  'September',
	  'October',
	  'November',
	  'December'
	];

	const viewAllTransactions = () => {
		fetch('http://localhost:3000/api/v1/expenses', {
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

	const viewPaymentsByChannel = (channel) => {
		setPaymentChannelToView(channel);
		fetch(`http://localhost:3000/api/v1/expenses?payment_channel=${channel}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': localStorage.getItem('token')
			}
		})
			.then(response => response.json())
			.then(txns => {
				setTransactions(txns);
			})
	}

	const viewPaymentsByMonth = (month) => {
		fetch(`http://localhost:3000/api/v1/expenses?month=${month}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': localStorage.getItem('token')
			}
		})
			.then(response => response.json())
			.then(txns => {
				setTransactions(txns);
			})
	}

	const viewPaymentsByDate = (date) => {
		let formattedDate = date.replaceAll('-', '');
		fetch(`http://localhost:3000/api/v1/expenses?date=${formattedDate}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': localStorage.getItem('token')
			}
		})
			.then(response => response.json())
			.then(txns => {
				setTransactions(txns);
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
			expense: {
			  name: transactionName,
			  amount: transactionAmount,
				payment_channel: selectedPaymentChannel
			}
		}

		fetch('http://localhost:3000/api/v1/expenses', {
		    method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify(data)
		})
	}

	const handleChannelChange = (channel) => {
	  viewPaymentsByChannel(channel);
	}

	const handleMonthChange = (channel) => {
	  viewPaymentsByMonth(channel);
	}

	const handleDateChange = (date) => {
	  viewPaymentsByDate(date);
	}

	return (
		<div className='mx-auto w-1/2'>
			<h1 className='text-purple-700 text-opacity-100 font-bold text-center text-xl'>What did you spend on?</h1>
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
					{paymentChannels.map((channel, index) => <option value={channel} key={channel}>{channel}</option>)}
				</select>
			  <input
					type='submit'
					value='Add Transaction'
			  />
			</form>
			<button
				onClick={() => viewAllTransactions()}
			>
			  All Transactions
			</button>
			<h3>
				View expenses by channel
			</h3>
			<select
				name='transactionsByPaymentChannel'
				onChange={e => handleChannelChange(e.target.value)}
			>
				{paymentChannels.map(channel => <option value={channel} key={channel}>{channel}</option>)}
			</select>
			<h3>
				View expenses by month
			</h3>
			<select
				name='transactionsByMonth'
				onChange={e => handleMonthChange(e.target.value)}
			>
				{MONTHS.map(month=> <option value={month} key={month}>{month}</option>)}
			</select>
			<input 
			  label='date'
			  type='date'
			  onChange={e => handleDateChange(e.target.value)}>
			</input>
			<div>
				<ul>
					{transactions.map(txn => <li key={txn.id}>{txn.name}: {txn.amount}</li>)}
				</ul>
			</div>
		</div>
	)
}

export default Transaction;
