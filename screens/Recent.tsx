import { StyleSheet, View } from "react-native"
import { ExpenseOutput } from "../components/ui/ExpensesOutput";
import { ExpenseType, useExpensesStore } from "../store";
import { useEffect, useState } from "react";
import { getExpensesQuery } from "../services/expenses";
import { alertMessage } from "../utils/alert.utils";
import { Spinner } from "../components/ui/Spinner";

const RecentExpensePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { expenses, setExpense } = useExpensesStore();

    useEffect(() => {
        getExpenses()
    }, []);

    const getExpenses = async () => {
        setIsLoading(true)
        try {
            const response = await getExpensesQuery();
            const newResponse = [] as ExpenseType[];

            for (let key in response) {
                newResponse.push({
                    id: key,
                    amount: response[key].amount,
                    date: new Date(response[key].date),
                    description: response[key].description
                })
            }
            setExpense(newResponse)
        } catch (error: any) {
            alertMessage({
                title: 'Error',
                message: error?.message,
                buttonText: 'Close'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const recentExpenses = expenses.filter(expense => {
        const today = new Date();
        const date7DaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDay() - 7);
        return expense.date >= date7DaysAgo
    })

    return (
        <>
            {isLoading && <Spinner />}
            <View style={styles.container}>
                <ExpenseOutput name="Last 7 days" expenses={recentExpenses} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

export default RecentExpensePage;