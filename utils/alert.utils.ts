import { Alert } from "react-native"

interface IAlertMessage {
    title: string;
    message: string;
    buttonText: string;
}
export const alertMessage = ({ title, message, buttonText }: IAlertMessage) => {
    Alert.alert(title, message ?? 'Something went wrong', [
        {
            text: buttonText,
            style: 'cancel'
        }
    ])
}