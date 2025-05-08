import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function AddScreen() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const handleSend = () => {
        // Handle sending money logic
        alert(`Sent $${amount} to ${recipient}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Recipient</Text>
            <TextInput
                value={recipient}
                onChangeText={setRecipient}
                style={styles.input}
                placeholder="Enter username or email"
            />
            <Text style={styles.label}>Amount</Text>
            <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
                placeholder="$0.00"
            />
            <Button title="Send Money" onPress={handleSend} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    label: { marginBottom: 5, fontSize: 16 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
});
