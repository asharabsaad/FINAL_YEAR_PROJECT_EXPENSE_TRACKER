import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function TotalExpense({ expense }) {

    const wantExpense = expense.filter(item => item.category === 'want').reduce((total, filterExpense) => total + filterExpense.amount, 0)
    const needExpense = expense.filter(item => item.category === 'need').reduce((total, filterExpense) => total + filterExpense.amount, 0)
    const investmentExpense = expense.filter(item => item.category === 'investment').reduce((total, filterExpense) => total + filterExpense.amount, 0)

    return (
        <Table >
            <TableHead >Total Expense</TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Want</TableCell>
                    <TableCell>INR {wantExpense}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Need</TableCell>
                    <TableCell>INR {needExpense}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Investment</TableCell>
                    <TableCell>INR {investmentExpense}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
