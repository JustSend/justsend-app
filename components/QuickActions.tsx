import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Action = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
};

const actions: Action[] = [
    { label: 'Send', icon: 'send', onPress: () => {} },
    { label: 'Receive', icon: 'download', onPress: () => {} },
    { label: 'Scan QR', icon: 'qr-code', onPress: () => {} },
];

export default function QuickActions() {
    return (
        <View style={styles.container}>
            {actions.map((action) => (
                <TouchableOpacity
                    key={action.label}
                    style={styles.button}
                    onPress={action.onPress}
                >
                    <Ionicons name={action.icon} size={24} color="#007AFF" />
                    <Text style={styles.label}>{action.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
    },
    label: {
        marginTop: 6,
        fontSize: 14,
    },
});
