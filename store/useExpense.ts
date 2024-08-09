import { create } from 'zustand'

export type ExpenseType = {
    id?: string;
    description: string;
    amount: number;
    date: Date
};

// const DUMMY_EXPENSES = [
//     {
//         id: 'e1',
//         description: 'A pair of shoes',
//         amount: 59.99,
//         date: new Date('2024-12-19')
//     },
//     {
//         id: 'e2',
//         description: 'A pair of trousers',
//         amount: 89.29,
//         date: new Date('2024-01-05')
//     },
//     {
//         id: 'e3',
//         description: 'Some bananas',
//         amount: 5.99,
//         date: new Date('2024-12-01')
//     },
//     {
//         id: 'e4',
//         description: 'A book',
//         amount: 14.99,
//         date: new Date('2024-02-19')
//     },
//     {
//         id: 'e5',
//         description: 'Another book',
//         amount: 18.59,
//         date: new Date('2024-02-18')
//     }
// ];

interface IExpenseState {
    expenses: ExpenseType[]
    addExpense(item: Omit<ExpenseType, 'id'>, id: string): void;
    setExpense(item: ExpenseType[]): void;
    updateExpense(id: string, item: Partial<Omit<ExpenseType, 'id'>>): void;
    removeExpense(id: string): void
}

export const useExpensesStore = create<IExpenseState>()((set) => ({
    expenses: [],
    setExpense: (expense) => set((state) => ({
        expenses: expense
    })),
    addExpense: (item, id) => set((state) => ({
        expenses: [{
            id,
            ...item
        }, ...state.expenses]
    })),
    updateExpense: (id, item) => set((state) => {
        const findExpenseIndex = state.expenses.findIndex(expense => expense.id === id);

        let updatedExpense = [...state.expenses];

        if (findExpenseIndex > -1) {
            const selectedExpense = updatedExpense[findExpenseIndex];

            updatedExpense[findExpenseIndex] = {
                ...selectedExpense,
                ...item
            }
        }


        return { expenses: updatedExpense }
    }),
    removeExpense: (id) => set((state) => ({ expenses: state.expenses.filter(item => item.id !== id) })),
}))