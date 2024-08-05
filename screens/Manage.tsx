import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { COLORS } from "../constants/colors.conts";
import CustomButton from "../components/ui/CustomButton";
import { useExpensesStore } from "../store";

type RootStackParamList = {
    ManageExpense: { expenseId: string };
};

type ManageExpensePageProps = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

type IProps = {
    route: RouteProp<RootStackParamList, 'ManageExpense'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'ManageExpense'>;
}

const ManageExpensePage = ({ route, navigation }: ManageExpensePageProps) => {
    const { removeExpense, addExpense, updateExpense } = useExpensesStore();


    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    const deleteExpense = () => {
        removeExpense(expenseId);
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = () => {
        if(isEditing){
            updateExpense(expenseId, {amount: 60000,description: '45tertre', date: new Date()});
            console.log('updated')
        }else {
            addExpense({amount: 50, description: 'new desc', date: new Date()})
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CustomButton mode="flat" onPress={cancelHandler}>Cancel</CustomButton>
                <CustomButton mode="default" onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</CustomButton>
            </View>
            <View style={styles.buttonContainer}>
                {isEditing && (
                    <Pressable
                        onPress={deleteExpense}
                        style={{
                            marginHorizontal: 10
                        }}>
                        <Ionicons name="trash" size={45} color="red" />
                    </Pressable>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    buttonContainer: {
        marginTop: 40,
        alignItems: 'center',

    }
})

export default ManageExpensePage;