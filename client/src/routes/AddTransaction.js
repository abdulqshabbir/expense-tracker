import React, { useState } from "react"

export default function Test({ onSubmit }) {
	const [name, setName] = useState('')
	const [amount, setAmount] = useState('')
	const [max, setMax] = useState('')

	function createNewExpense(e) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
				expenseName: name, 
				expenseAmount: Number(amount),
				expenseMax: Number(max) 
			})
		}
		fetch("http://localhost:4000/expenses", requestOptions)
			.then(response => response.json())
			.then(newExpense => {
				if (name === '' || amount < 0 || max <= 0) {
					console.error('Invalid data sent')
				} else{
					onSubmit(newExpense)
					setName('')
					setAmount('')
					setMax('')
				}
			})
			.catch(e => console.log(e))
	}

	return (
		<React.Fragment>
			<div className="xl:pl-56 xl:pr-10 grid grid-cols-2 justify-items-center pt-6 pb-3 gap-y-4 bg-blue-100">
				<label htmlFor="expenseName">Expense name: </label>
				<input type="text" name="expenseName" value={name} onChange={e => setName(e.target.value)} 
					className="w-5/6 bg-blue-200 ring-1 rounded-md ring-blue-500 p-1"/>

				<label htmlFor="expenseAmount">Expense amount: </label>
				<input type="number" step="any" name="expenseAmount" value={amount} onChange={e => setAmount(e.target.value)} 
					className="w-5/6 bg-blue-200 ring-1 rounded-md ring-blue-500 p-1"/>

				<label htmlFor="expenseMax">Expense max: </label>
				<input type="number" step="any" name="expenseMax" value={max} onChange={e => setMax(e.target.value)}
					className="w-5/6 bg-blue-200 ring-1 rounded-md ring-blue-500 p-1"/>

				<div></div>
				<button type="submit" className="bg-blue-200 ring-1 rounded-md ring-blue-500 px-4 py-2"
						onClick={e => createNewExpense(e)}>
					Submit
				</button>

			</div>
		</React.Fragment>
	)
}