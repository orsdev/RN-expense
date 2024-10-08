import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { COLORS } from "../../constants/colors.conts";
import { useNavigation } from "@react-navigation/native";
import { ExpenseType } from "../../store";

interface IExpenseList {
    expenses: Array<ExpenseType>
}

interface IRenderItem {
    item: ExpenseType;
}

function ExpenseItem({ item }: IRenderItem) {
    const navigation = useNavigation();
    return (
        <Pressable
            style={({ pressed }) => pressed && styles.pressedButton}
            onPress={() => {
                //@ts-ignore
                navigation.navigate("ManageExpense" as never, {
                    expenseId: item.id
                })
            }
            }
        >
            <View style={styles.item}>
                <View>
                    <Text style={{
                        marginBottom: 2
                    }}>{item.description}</Text>
                    <Text>{new Date(item.date).toLocaleDateString()}</Text>
                </View>
                <View>
                    <Text>${item.amount}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export const ExpensesList = ({ expenses }: IExpenseList) => {
    return (
        <>
        <FlatList
            data={expenses}
            renderItem={({ item }) => <ExpenseItem item={item} />}
            keyExtractor={(item) => item?.id as string}
        />
        {expenses && !(!!expenses.length) && <Text style={{
            textAlign: 'center',
            marginTop: 30
        }}>There no expenses.</Text>}
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: COLORS.accent,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
    },
    pressedButton: {
        opacity: .6
    }
})