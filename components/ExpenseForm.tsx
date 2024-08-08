import { StyleSheet, Text, View } from "react-native";
import TextBox from "./ui/TextBox";
import { Controller, useForm } from "react-hook-form";
import { ExpenseType, useExpensesStore } from "../store";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import CustomButton from "./ui/CustomButton";
import { useNavigation } from "@react-navigation/native";

const validationSchema = object().shape({
    amount: number()
        .typeError('Must be a number')
        .min(40, 'Min of 40').required('Amount is required'),
    description: string().required('Description is required'),
    date: string().required('Date is required')
})



const ExpenseForm = ({ isEditing, expenseId }: { isEditing: boolean, expenseId: string }) => {
    const navigation = useNavigation();
    const { addExpense, updateExpense, expenses } = useExpensesStore();

    const findExpense = expenses.find(item => item.id === expenseId);


    const { handleSubmit, control } = useForm({
        defaultValues: {
            amount: findExpense?.amount?.toString() ?? undefined,
            date: findExpense ? new Date(findExpense?.date)?.toISOString().slice(0, 10) : '',
            description: findExpense?.description ?? ''
        } as any,
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: Omit<ExpenseType, 'id' | 'date'> & {
        date: string,
        amount: string;
    }) => {
        const updatedData = {
            ...data,
            amount: parseInt(data.amount),
            date: new Date(data.date)
        }

        if (isEditing) {
            updateExpense(expenseId, updatedData);
        } else {
            addExpense(updatedData)
        }
        navigation.goBack()
    }

    return (
        <View style={style.container}>
            <Controller
                control={control}
                name="amount"
                render={({ fieldState, field: { onChange, onBlur, value } }) => {
                    return (
                        <TextBox
                            type="decimal-pad"
                            label="Amount"
                            value={value}
                            handleBlur={onBlur}
                            handleChange={onChange}
                            errorMessage={fieldState.error?.message}
                        />
                    )
                }}
            />

            <Controller
                control={control}
                name="date"
                render={({ fieldState, field: { onChange, onBlur, value } }) => {
                    return (
                        <TextBox
                            type="default"
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            value={value}
                            maxLength={10}
                            errorMessage={fieldState.error?.message}
                            handleBlur={onBlur}
                            handleChange={onChange}
                        />
                    )
                }}
            />

            <Controller
                control={control}
                name="description"
                render={({ fieldState, field: { onChange, onBlur, value } }) => {
                    return (
                        <TextBox
                            type="default"
                            label="Description"
                            value={value}
                            multiline
                            numberOfLines={5}
                            errorMessage={fieldState.error?.message}
                            handleBlur={onBlur}
                            handleChange={onChange}
                        />
                    )
                }}
            />

            <CustomButton mode="default" onPress={handleSubmit(onSubmit)}>
                {isEditing ? 'Update changes' : 'Save changes'}
            </CustomButton>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        gap: 10
    }
})

export default ExpenseForm;

