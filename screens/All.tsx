import { StyleSheet, Text, View } from "react-native"
import { ExpenseOutput } from "../components/ui/ExpensesOutput";
import { useExpensesStore } from "../store";

const AllExpensePage = () => {
    const { expenses } = useExpensesStore();

    return (
        <View style={styles.container}>
            <ExpenseOutput name="Total" expenses={expenses}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

export default AllExpensePage;