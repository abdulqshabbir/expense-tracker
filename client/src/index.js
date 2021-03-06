import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import IndexPage from "./routes/Index"
import EditCategories from "./routes/EditCategories"
import Transaction from "./routes/Transaction"
import Chart from "./routes/Chart"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CategoriesProvider from "./contexts/Categories"
import ExpensesProvider from "./contexts/Expenses"
import Login from "./routes/Login"
import Signup from "./routes/Signup"
import UserProvider from "./contexts/User"
import ModalProvider from "./contexts/Modal"

ReactDOM.render(
  // browser router connects our react app to the browser URL
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <CategoriesProvider>
        <ExpensesProvider>
          <ModalProvider>
            <Routes>
                <Route path="/" element={ <IndexPage /> } />
                <Route path="/edit-categories" element={ < EditCategories/> } />
                <Route path="/transaction" element={ <Transaction /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/signup" element={ <Signup /> } />
                <Route path="/chart" element={ <Chart /> } />
            </Routes>
          </ModalProvider>
        </ExpensesProvider>
      </CategoriesProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

