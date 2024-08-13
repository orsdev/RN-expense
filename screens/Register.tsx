import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native"
import CustomButton from "../components/ui/CustomButton";
import { Controller, useForm } from "react-hook-form";
import TextBox from "../components/ui/TextBox";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "../components/ui/Spinner";
import { Link, useNavigation } from "@react-navigation/native";
import { registerMutation } from "../services/auth";
import { useState } from "react";
import { alertMessage } from "../utils/alert.utils";
import MainLayout from "../layout/MainLayout";

const validationSchema = object().shape({
    email: string().email("Invalid email").required('Field is required'),
    password: string().required('Field is required'),
})


const RegisterPage = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (values: { email: string; password: string }) => {
        setIsLoading(true)
        try {
            const response = await registerMutation(values);
            navigation.navigate("LoginPage" as never)
        } catch (err: any) {
            alertMessage({
                title: 'Error',
                message: err?.message,
                buttonText: 'Close'
            })
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <MainLayout isProtected={false}>
            {isLoading && <Spinner />}
            <StatusBar style="dark" />
            <View style={styles.container}>
                <Text style={styles.header}>Create an account</Text>
                <View>
                    <Controller
                        control={control}
                        name="email"
                        render={({ fieldState, field: { onChange, onBlur, value } }) => {
                            return (
                                <TextBox
                                    type="default"
                                    label="Email"
                                    autoCapitalize="none"
                                    placeholder="Enter your email"
                                    value={value}
                                    errorMessage={fieldState.error?.message}
                                    handleBlur={onBlur}
                                    handleChange={onChange}
                                />
                            )
                        }}
                    />
                </View>
                <View style={{
                    marginVertical: 20
                }}>
                    <Controller
                        control={control}
                        name="password"
                        render={({ fieldState, field: { onChange, onBlur, value } }) => {
                            return (
                                <TextBox
                                    type="default"
                                    label="Password"
                                    placeholder="Enter your password"
                                    value={value}
                                    autoCapitalize="none"
                                    errorMessage={fieldState.error?.message}
                                    handleBlur={onBlur}
                                    handleChange={onChange}
                                />
                            )
                        }}
                    />
                    <Link to="/LoginPage" style={{ marginTop: 8 }}>
                        <Text>Have an account? Login</Text>
                    </Link>
                </View>
                <CustomButton mode="default" onPress={handleSubmit(onSubmit)}>
                    Create account
                </CustomButton>
            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        marginTop: 70
    },
    input: {
        width: '100%',
        height: 40,
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    header: {
        fontSize: 30,
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 20
    }
})

export default RegisterPage;