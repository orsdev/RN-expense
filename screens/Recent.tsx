import { StyleSheet, View } from "react-native"
import { ExpenseOutput } from "../components/ui/ExpensesOutput";
import { useExpensesStore } from "../store";

const RecentExpensePage = () => {
    const { expenses } = useExpensesStore();

    const recentExpenses = expenses.filter(expense => {
        const today = new Date();
        const date7DaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDay() - 7);
        return (expense.date >= date7DaysAgo) && (expense.date <= today)
    })

    return (
        <View style={styles.container}>
            <ExpenseOutput name="Last 7 days" expenses={recentExpenses} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

export default RecentExpensePage;