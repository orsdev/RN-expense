import request from "../lib/axios"
import { ExpenseType } from "../store";

type ExpensesData = Omit<ExpenseType, 'id' | 'date'>;

export const getExpensesQuery = async () => {
    return (await request.get('/expense.json')).data
};

export const updateExpensesMutation = async (data: ExpensesData, id: string) => {
    return await request({
        url: `/expense/${id}.json`,
        method: 'PUT',
        data: data
    });
};

export const deleteExpensesMutation = async (id: string) => {
    return await request({
        url: `/expense/${id}.json`,
        method: 'DELETE'
    });
};

export const addExpensesMutation = async (data: ExpensesData) => {
    return await request({
        url: '/expense.json',
        method: 'POST',
        data: data
    });
}