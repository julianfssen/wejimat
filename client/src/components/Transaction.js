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

	const formatAmount = (amount) => {
		let [dollars, cents] = amount.split('.');
		let formattedDollars = '';
		let formattedCents;

		if (dollars.length > 3) {
			let separatorCount = Math.floor(dollars.length / 3);

			for (let counter = 0; counter < separatorCount; counter++) {
				const startIndex = dollars.length - (3 * (counter + 1));
				const endIndex = startIndex + 3;
				const tmp = counter === 0 ? dollars.substring(startIndex) : dollars.substring(startIndex, endIndex);

				formattedDollars = ',' + tmp + formattedDollars;
			}

			formattedDollars = dollars.substring(0, dollars.length % 3) + formattedDollars
		} else {
			formattedDollars = dollars;
		}

		if (cents.length < 2) {
			formattedCents = cents.padEnd(2, '0');
		} else {
			formattedCents = cents;
		}

		const formattedAmount = 'RM' + formattedDollars + '.' + formattedCents;

		return formattedAmount
	}

	const formatDate = (date) => {
		const options = { weekday: 'long', month: 'long', day: 'numeric' };
		return new Date(date).toLocaleDateString('en-GB', options)
	}

	return (
		<div className='mx-auto w-1/2'>
		  <div className='add-expense-form mx-auto w-3/4'>
				<div>
		      <h1 className='my-5 text-purple-700 font-bold text-center text-2xl'>
			      What did you spend on?
			    </h1>
				</div>
		    <form
					onSubmit={e => handleSubmit(e)}
				  className='grid grid-cols-1 gap-4'
				>
					<div
					  className='text-purple-700 font-semibold text-center text-xl'
					>
						I spent on...
					</div>
		      <input
		      	type='text'
		      	name='transactionName'
		        placeholder='Food, games, shopping...'
		      	value={transactionName}
		      	onChange={e => setTransactionName(e.target.value)}
		    	  className='mx-auto px-4 py-2 w-60 border rounded-md shadow-md'
		      >
		      </input>
					<div
					  className='text-purple-700 font-semibold text-center text-xl'
					>
						For this amount...
					</div>
					<div
						className='flex flex-row justify-center'
					>
						<div
							className='mt-2 relative'
						>
    				  <span className="absolute inset-y-0 left-3 text-gray-500 sm:text-m font-bold">
    				    RM
    				  </span>
						</div>
		        <input
		        	type='text'
		        	name='transactionAmount'
		    	  	value={transactionAmount > 0 ? transactionAmount : ''}
		        	onChange={e => setTransactionAmount(e.target.value)}
		    	    className='mx-1 px-3 py-2 pl-10 h-10 w-60 border rounded-md shadow-md'
		        />
					</div>
					<div
					  className='text-purple-700 font-semibold text-center text-xl'
					>
						By using...
					</div>
		    	<input
		    	  name='paymentChannels'
		    	  onChange={e => setSelectedPaymentChannel(e.target.value)}
		    	  className='inline-flex justify-center h-10 w-60 rounded-md border shadow-md mx-auto pl-2.5 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 cursor-pointer'
						list='paymentChannelsList'
						placeholder='Boost, Grab, Maybank...'
		    	/>
					<datalist
						id='paymentChannelsList'
					>
		    	  {paymentChannels.map(channel => <option value={channel} key={channel}>{channel}</option>)}
					</datalist>
		      <input
		    	  className='w-40 mt-4 mx-auto border rounded-md bg-purple-600 text-white font-medium p-1.5 px-5 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 cursor-pointer'
		    	  type='submit'
		    	  value='Add Expense'
		      />
		    </form>
		  </div>
		  <div className='expenses-management container mx-auto'>
			  <h1 className='mx-5 my-5 text-purple-700 font-bold text-center text-2xl'>
			    My Expenses
			  </h1>
		      <button
		        className='view-all-expenses-btn mx-auto border rounded-md bg-purple-600 text-white font-medium p-1.5 px-5 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 cursor-pointer'
		        onClick={() => viewAllTransactions()}
		      >
		        All Expenses
		      </button>
			  <div className='view-expenses-by-channel flex mx-auto'>
		      <h3 className='mx-5 my-5 text-purple-700 font-semibold text-center text-xl'>
		      	View expenses by payment providers
		      </h3>
		      <select
		      	name='transactionsByPaymentChannel'
		      	onChange={e => handleChannelChange(e.target.value)}
		      	className='view-expenses-by-channel-btn inline-flex justify-center w-1/8 rounded-md border border-gray-300 shadow-sm mx-2 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 cursor-pointer'
		      >
		      	{paymentChannels.map(channel => <option value={channel} key={channel}>{channel}</option>)}
		      </select>
			  </div>
			  <div className='view-expenses-by-month flex mx-auto'>
		        <h3 className='mx-5 my-5 text-purple-700 font-semibold text-center text-xl'>
		        	View expenses by month
		        </h3>
		        <select
		        	name='transactionsByMonth'
		        	onChange={e => handleMonthChange(e.target.value)}
		      	className='view-expenses-by-month-btn inline-flex justify-center w-1/8 rounded-md border border-gray-300 shadow-sm mx-2 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 cursor-pointer'
		        >
		        	{MONTHS.map(month=> <option value={month} key={month}>{month}</option>)}
		        </select>
			  </div>
			  <div className='view-expenses-by-date flex mx-auto'>
		        <h3 className='mx-5 my-5 text-purple-700 font-semibold text-center text-xl'>
		        	View expenses by date
		        </h3>
		        <input 
		          label='date'
		          type='date'
		          onChange={e => handleDateChange(e.target.value)}
			  	defaultValue={new Date().toISOString().slice(0, 10)}
		      	className='view-expenses-by-date-btn inline-flex justify-center w-1/8 rounded-md border border-gray-300 shadow-sm mx-2 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 cursor-pointer'
			    >
		        </input>
			  </div>
		  </div>
			<div
				className='expenses-table-container mt-10'
			>
				<table
					className='expenses-table border-collapse border w-full'
				>
					<tr>
						<th
							className='w-1/2'
						>
						  Expense
						</th>
						<th>Amount</th>
						<th>Date</th>
					</tr>
					{transactions.map(txn =>
					  <tr
							key={`expense-${txn.id}`}
						>
							<td>{txn.name}</td>
							<td>{formatAmount(txn.amount)}</td>
							<td>{formatDate(txn.created_at)}</td>
					  </tr>
					)}
				</table>
			</div>
		</div>
	)
}

export default Transaction;
