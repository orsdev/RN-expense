import { StyleSheet, View } from "react-native"
import { ExpensesSummary } from "./ExpensesSummary"
import { ExpensesList } from "./ExpensesList"
import { ExpenseType } from "../../store";

export const ExpenseOutput = ({ name, expenses }: { name: string, expenses: ExpenseType[] }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary name={name} expenses={expenses} />
            <ExpensesList expenses={expenses} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    }
})