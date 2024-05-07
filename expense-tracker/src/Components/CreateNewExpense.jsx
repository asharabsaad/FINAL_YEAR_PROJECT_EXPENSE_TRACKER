import React, { useState } from "react";
import { useExpenseContext } from "../Hooks/useExpenseContext";
import { useUserContext } from "../Hooks/useUserContext";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";

export default function CreateNewExpense({ toggle }) {
  const initialExpense = {
    name: "",
    description: "",
    date: "",
    amount: "",
  };

  const { user } = useUserContext();
  const [expense, setExpense] = useState(initialExpense);
  const { dispatch } = useExpenseContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, date, amount } = expense;
    const { email } = user;
    console.log(email);

    const responses = await fetch("http://localhost:5000/api/expenses/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      method: "POST",
      body: JSON.stringify({ name, category, date, amount }),
    });
    const json = await responses.json();

    if (!responses.ok) {
      return console.log(json.error);
    }

    dispatch({ type: "ADD_TO_EXPENSE_LIST", payload: json });
    toggle();
    setExpense(initialExpense);
  };

  const onChangeHandler = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const onClose = () => {
    setExpense(initialExpense);
    toggle();
  };

  const createExpense = () => {
    if (
      !expense.name ||
      !expense.description ||
      !expense.category ||
      !expense.date ||
      !expense.amount
    ) {
      return alert("Please fill all the fields");
    }
    handleSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label className="font-bold" htmlFor="name">
                Name
              </label>
              <input
                className="px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current"
                onChange={onChangeHandler}
                type="text"
                name="name"
                id="name"
                value={expense.name}
                placeholder="Name the Expense"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="font-bold" htmlFor="description">
                Description
              </label>
              <input
                className="px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current"
                onChange={onChangeHandler}
                type="text"
                name="description"
                id="name"
                value={expense.description}
                placeholder="Describe the Expense"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="font-bold" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={expense.category}
                onChange={onChangeHandler}
                className="px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current"
              >
                <option value="Select Category">Select Category</option>
                <option value="need">Need</option>
                <option value="want">Want</option>
                <option value="investment">Investment</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="font-bold" htmlFor="date">
                Date of Expense
              </label>
              <input
                className="px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current"
                onChange={onChangeHandler}
                type="date"
                name="date"
                value={expense.date}
                id="date"
                placeholder="Date of Expense (date-picker)"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="font-bold" htmlFor="amount">
                Expense Amount
              </label>
              <input
                className="px-8 py-1 bg-input rounded-sm text-gray-500 font-medium  placeholder:text-current"
                onChange={onChangeHandler}
                type="number"
                name="amount"
                id="amount"
                value={expense.amount}
                placeholder="Expense Amount in INR"
              />
            </div>
            <CardFooter className="flex justify-between">
               
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={createExpense}>Create Expense</Button>
                    {/* <input type="submit" value="Create Expense" className='bg-green-500 text-white px-4 py-1 rounded' /> */}
                
            </CardFooter>
            
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
