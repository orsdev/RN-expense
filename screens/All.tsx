import { StyleSheet, Text, View } from "react-native"
import { ExpenseOutput } from "../components/ui/ExpensesOutput";
import { useExpensesStore } from "../store";
import MainLayout from "../layout/MainLayout";

const AllExpensePage = () => {
    const { expenses } = useExpensesStore();

    return (
        <MainLayout>
            <View style={styles.container}>
                <ExpenseOutput name="Total" expenses={expenses} />
            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

export default AllExpensePage;