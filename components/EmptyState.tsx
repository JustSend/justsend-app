import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ message }: { message: string }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
});
