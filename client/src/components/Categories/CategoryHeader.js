import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faCircleMinus, faGripHorizontal } from "@fortawesome/free-solid-svg-icons"
import deleteCategory from "../../services/deleteCategory"

import getCategories from "../../services/getCategories"
import getExpenses from "../../services/getExpenses"
import { useCategories } from "../../contexts/Categories"
import { useExpenses } from "../../contexts/Expenses"

export default function CategoryHeader({ category, setRenderAddExpenseField }) {
    let [ , setExpenses ] = useExpenses()
    let [ , setCategories ] = useCategories()

    async function handleCategoryDelete(e) {
        try {
            let isDeleted = await deleteCategory(category.id)
            if (isDeleted) {
                let newCategories = await getCategories()
                let newExpenses = await getExpenses()
                setExpenses(newExpenses)
                setCategories(newCategories)
            }
        } catch(e) {
            console.log(e)
        }
    }

    return(
        <React.Fragment>
            <div className="h-14 px-4 flex flex-wrap justify-between items-center bg-primaryGray-100 border-b-[1px] border-x-[1px]">
                <div className="mx-8 flex justify-center items-center">
                    <h2 className="overflow-ellipsis">{category.name}</h2>	
                    <FontAwesomeIcon onClick={e => handleCategoryDelete(e)} className="ml-4 cursor-pointer hover:scale-125" icon={faCircleMinus} />
                </div>
                <div className="mx-8 flex justify-center items-center">
                    <FontAwesomeIcon onClick={() => setRenderAddExpenseField(true)} className="hover:cursor-pointer hover:scale-125" icon={faCirclePlus} />
                    <FontAwesomeIcon className="ml-4" icon={faGripHorizontal} />
                </div>
            </div> 
        </React.Fragment>
    )
}