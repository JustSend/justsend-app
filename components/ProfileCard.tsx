import { View, Text, StyleSheet } from 'react-native';

type Props = {
    name: string;
    email: string;
};

export default function ProfileCard({ name, email }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: '#f4f4f4',
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    name: { fontSize: 20, fontWeight: 'bold' },
    email: { fontSize: 14, color: '#555' },
});
