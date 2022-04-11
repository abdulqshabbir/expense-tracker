import React, { useState } from "react"
import Header from "../components/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleMinus, faCirclePlus, faFolderPlus, faGripHorizontal } from "@fortawesome/free-solid-svg-icons"
import { useCategories } from "../contexts/Categories"
import { useExpenses } from "../contexts/Expenses"
import createCategory from '../services/createCategory'
import createExpense from '../services/createExpense'
import SiteWrapper from "../components/SiteWrapper"

export default function Categories() {
	const [renderAddCategory, setRenderAddCategory] = useState(false)
	return (
		<SiteWrapper>
			<Header/>
			<main>
				<div onClick={() => setRenderAddCategory(true)} className="h-20 flex flex-wrap justify-center items-center cursor-pointer">
					<button className="h-14 px-8 py-2 text-xl bg-primaryGray-200 hover:bg-gray-200 rounded-lg">
						<span className="mr-4">Add New Category</span>
						<FontAwesomeIcon className="hover:scale-125" icon={faFolderPlus} size="lg"/>
					</button>
				</div>
				<AddCategoryField renderAddCategory={renderAddCategory} setRenderAddCategory={setRenderAddCategory} />
				<RenderCategories/>
			</main>
		</SiteWrapper>
	)
}

function RenderCategories() {
	const [categories, _] = useCategories()
	return categories.map(c => <Category key={c.id} category={c} /> )
}

function Category({ category }) {
	const [categories, setCategories] = useCategories()
	const [expenses, setExpenses] = useExpenses()
	const [renderAddExpenseField, setRenderAddExpenseField] = useState(false)

	return (
		<React.Fragment>
			<div className="h-14 px-4 flex flex-wrap justify-between items-center bg-primaryGray-100 border-b-[1px] border-x-[1px]">
					<div className="mx-8 flex justify-center items-center">
					<h2 className="overflow-ellipsis">{category.name}</h2>	
					<FontAwesomeIcon className="ml-4 cursor-pointer hover:scale-125" icon={faCircleMinus} />
				</div>
				<div className="mx-8 flex justify-center items-center">
					<FontAwesomeIcon onClick={() => setRenderAddExpenseField(true)} className="hover:cursor-pointer hover:scale-125" icon={faCirclePlus} />
					<FontAwesomeIcon className="ml-4" icon={faGripHorizontal} />
				</div>
			</div>
			<AddExpenseField
				renderField={renderAddExpenseField}
				setRenderField={setRenderAddExpenseField}
				cId={category.id}
			/>
			<RenderExpenses cId={category.id} expenses={expenses} />
		</React.Fragment>
	)
}

function RenderExpenses({ cId, expenses }) {
	return expenses
	.filter(e => e.categoryId === cId)
	.map(e => <Expense key={e.id} expense={e} />)	
}

function Expense({ expense }) {
	return (
		<div className="h-16 px-4 flex flex-wrap justify-between items-center border-b-[1px]">
			<h3 className="mx-8 flex justify-center items-center">{expense.name}</h3>
			<p className="mx-8 flex justify-center items-center">{expense.max} CAD</p>
		</div>
	)
}

function AddCategoryField({ renderAddCategory, setRenderAddCategory }) {
	const [categories, setCategories] = useCategories()
	const [cName, setcName] = useState("")
	const [error, setError] = useState(null)
	function createNewCategory() {
		createCategory(cName)
			.then(newCategory => {
				setCategories([...categories, newCategory ])
				setcName("")
				setRenderAddCategory(false)
				setError(null)
			})
			.catch(e => {
				setError(e.message)
			})
	}
	if (renderAddCategory) {
		return (
			<React.Fragment>
				<div>
					<div className="h-12 my-2 mx-8 flex flex-wrap justify-between items-center">
						<label className="w-1/2" htmlFor="cName" placeholder="Category Name">Category Name:</label>
						<input
							onChange={e => setcName(e.target.value)}
							value={cName}
							placeholder="Category Name"
							className="w-1/2 h-10 p-2 border-2 border-gray-300 rounded-md" type="text" name="cName" id="cName"
						/>
					</div>
					<div className="text-red-500 text-center">
						<p>{error}</p>
					</div>
					<div className="my-2 flex justify-center items-center">
						<button onClick={() => createNewCategory()} className="h-12 mx-8 mb-4 w-full border-2 border-blue-400 bg-blue-200 rounded hover:bg-blue-400" >Save</button>
					</div>
				</div>
			</React.Fragment>
		)
	}
	return null
}

function AddExpenseField({ renderField, setRenderField, cId }) {
	const [expenses, setExpenses] = useExpenses()
	const [name, setName] = useState("")
	const [max, setMax] = useState("")
	const [error, setError] = useState(null)

	function createNewExpense() {
		// validation requires strings be converted to numbers before
		// making a POST request
		createExpense(name, parseFloat(max), parseFloat(max), cId)
			.then(newExpense => {
				setError(null)
				setRenderField(false)
				setName("")
				setMax("")
				setExpenses([...expenses, newExpense])
			})
			.catch(e => {
				setError(e.message)
			})
	}
	if (renderField) {
		return(
			<div>
				<div className="h-12 my-4 mx-8 flex justify-between items-center">
					<label className="w-1/2" htmlFor="eName">Expense Name:</label>
					<input
						onChange={e => setName(e.target.value)}
						value={name}
						placeholder="Expense Name"
						className="w-1/2 h-10 p-2 border-2 border-gray-300 rounded-md" type="text" name="eName" id="eName"
					/>
				</div>
				<div className="h-12 my-2 mx-8 flex justify-between items-center">
					<label className="w-1/2" htmlFor="eMax">Monthly Budget:</label>
					<input
						onChange={e => setMax(e.target.value)}
						value={max}
						placeholder="Monthly Budget"
						className="w-1/2 h-10 p-2 border-2 border-gray-300 rounded-md" type="text" name="eMax" id="eMax"
					/>
				</div>
				<div className="text-red-500 text-center">
					{error}
				</div>
				<div className="flex justify-center items-center">
					<button onClick={createNewExpense} className="h-12 mx-8 mb-4 w-full border-2 border-blue-400 bg-blue-200 rounded hover:bg-blue-400" >Save</button>
				</div>
			</div>
		)
	}
	return null
}