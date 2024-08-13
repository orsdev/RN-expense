import { ReactNode, useEffect } from "react"
import { useAuthStore } from "../store";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { getFromSecureStore } from "../utils/secureStore";

interface IMainLayout {
    children: ReactNode;
    isProtected?: boolean;
}

const MainLayout = ({ children, isProtected = true }: IMainLayout) => {
    const { token, setToken } = useAuthStore();
    // const navigation = useNavigation();

    // useEffect(() => {
    //     if (isProtected && user && !!token) {
    //         console.log({ token: token.slice(0, 6), user })
    //     } else {
    //         if (!isProtected && !token) {
    //             console.log("not logged in")
    //             navigation.navigate('LoginPage' as never)
    //         }
    //     }
    // }, [token, user, isProtected])



    return (
        <>
            {children}
        </>
    )
}

export default MainLayout
