import { ActivityIndicator, StyleSheet, View } from "react-native"

export const Spinner = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
    </View>
)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})