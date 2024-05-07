import React, { useState, useMemo } from 'react'
import { useExpenseContext } from '../Hooks/useExpenseContext'
import CreateNewExpense from '../Components/CreateNewExpense'
import ExpenseItem from '../Components/ExpenseItem'
import TotalExpense from '../Components/TotalExpense'
import { useUserContext } from '../Hooks/useUserContext'
import {Button} from '../Components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


export default function Home() {
    const { expense } = useExpenseContext()
    const [newExpenseModalOpen, setNewExpenseModalOpen] = useState(false)
    const [filterValue, setFilterValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [categorySearch, setCategorySearch] = useState('')
    const { dispatch } = useUserContext()
    let filteredExpense = expense

    filteredExpense = useMemo(() => {
        const searchFilteredResult = filteredExpense.filter(item => {
            if (filterValue === '' && searchValue === '') {
                return true
            } else if (filterValue !== '' && item.date.includes(filterValue)) {
                return true
            } else if (searchValue !== '' && item.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return true
            } else {
                return false
            }
        })

        return searchFilteredResult.filter(expense => {
            if (categorySearch === '')
                return true
            else {
                return expense.category === categorySearch
            }
        })

    }, [filterValue, categorySearch, searchValue, expense])

    // filteredExpense = useMemo(() => {
    //     console.log("second use memo also running")
    //     return filteredExpense.filter(expense => {
    //         if (categorySearch === '')
    //             return true
    //         else {
    //             return expense.category === categorySearch
    //         }
    //     })
    // }, [categorySearch, expense])

    const toggle = () => {
        setNewExpenseModalOpen(prev => !prev)
    }

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value)
    }
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: "LOGOUT" })
        navigate("/login")
    }

    // useEffect(() => {
    //     setFilteredExpense(expense.filter(item => {
    //         if (filterValue === '' && searchValue === '') {
    //             return true
    //         } else if (filterValue !== '' && item.date.includes(filterValue)) {
    //             return true
    //         } else if (searchValue !== '' && item.name.toLowerCase().includes(searchValue.toLowerCase())) {
    //             return true
    //         } else {
    //             return false
    //         }
    //     }))
    // }, [filterValue])


    // useEffect(() => {
    //     setFilteredExpense(expense.filter(expense => {
    //         if (categorySearch === '')
    //             return true
    //         else {
    //             return expense.category === categorySearch
    //         }
    //     }))

    // }, [categorySearch, expense])



    return (
        <div className=''>
            {newExpenseModalOpen ?
                <CreateNewExpense toggle={toggle} />
                :
                <div >
                    <div className='flex flex-col justify-between md:flex-row'>
                        <h1 className='font-semibold text-2xl'>Expense Manager</h1>
                        <div className='flex flex-col  gap-2 lg:flex-row'>
                            <div className='flex gap-2'>
                                <select className='border-4 rounded border-black px-4 font-medium text-gray-600' value={categorySearch} onChange={e => setCategorySearch(e.target.value)}>
                                    <option value="">Search by Category</option>
                                    <option value="need">need</option>
                                    <option value="want">want</option>
                                    <option value="investment">investment</option>
                                </select>
                                <input type="date" className='flex border-4 rounded border-black px-4 font-medium text-gray-600' onChange={handleFilterChange} placeholder="Filter By Date of Expense"></input>
                                <input placeholder='Search Expense by Name' className='border-4 rounded border-black px-4 font-medium text-gray-600' onChange={(e) => setSearchValue(e.target.value)}></input>
                            </div>
                            <Button onClick={toggle}>+ New Expense</Button>
                        </div>
                    </div>
                    
                        <Table className='w-full rounded-md mt-6 border overflow-x-auto col-span-9'>
                            <thead className='text-gray-700'>
                                <TableRow className='w-full bg-gray-300 border border-black'>
                                    <TableHead >Name</TableHead>
                                    <TableHead >Category</TableHead>
                                    <TableHead >Date of Expense</TableHead>
                                    <TableHead >Amount</TableHead>
                                    <TableHead >Updated At</TableHead>
                                    <TableHead >{" "}</TableHead>
                                </TableRow>
                            </thead>
                            <tbody >
                                {filteredExpense.map((item) => {
                                    return <ExpenseItem item={item} key={item._id} />
                                })}
                            </tbody>
                        </Table>
                        <TotalExpense expense={expense} />

                        
                    
                    <Button variant="destructive" className='mt-10' onClick={() => logout()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                            <h2>Signout</h2>
                    </Button>
                    {/* <Button variant="destructive" className='mt-10' >LogOut</Button> */}
                </div>
            }
        </div>
    )
}
