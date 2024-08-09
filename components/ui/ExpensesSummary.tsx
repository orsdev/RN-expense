import { StyleSheet, View, Text } from "react-native"
import { COLORS } from "../../constants/colors.conts";
import { ExpenseType } from "../../store";

export interface ISummary {
    name: string;
    expenses: Array<ExpenseType>
}
export const ExpensesSummary = ({ name, expenses }: ISummary) => {
    const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text style={styles.total}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.bg,
        borderRadius: 4
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})