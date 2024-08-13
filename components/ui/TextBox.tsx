import { KeyboardType, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData, View } from "react-native"

interface ITextBox {
    label: string;
    value: any
    handleBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
    handleChange(value: string): void;
    placeholder?: string;
    type?: KeyboardType
    multiline?: boolean;
    autoCorrect?: boolean; //TODO: Prevent from correcting user email or intentional data
    numberOfLines?: number;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    maxLength?: number;
    errorMessage?: string
};

const TextBox = ({ label, value, type, errorMessage = '', placeholder = '', handleChange, ...rest }: ITextBox) => {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleChange}
                value={value}
                placeholder={placeholder}
                autoCorrect={false || rest.autoCorrect}
                autoCapitalize="none"
                keyboardType={type}
                {...rest}
            />
            {!!errorMessage && (
                <Text style={{
                    color: 'red',
                    fontSize: 14
                }}>{errorMessage}</Text>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        minHeight: 40,
        marginTop: 5,
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
    },
});

export default TextBox;