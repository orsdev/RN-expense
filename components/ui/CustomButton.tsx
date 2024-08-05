import { Pressable, StyleProp, StyleSheet, Text, View } from 'react-native';
import { ReactNode } from 'react';
import { COLORS } from '../../constants/colors.conts';

interface IButton {
    children: ReactNode
    onPress(): void;
    style?: any
    mode?: 'flat' | 'default'
};

function CustomButton({ children, onPress, mode = 'flat', style }: IButton) {
    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: COLORS.secondary,
    },
    flat: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: COLORS.secondary,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: COLORS.primary,
        borderRadius: 4,
    },
});