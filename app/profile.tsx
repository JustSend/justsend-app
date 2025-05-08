import { View, StyleSheet, Button } from 'react-native';
import ProfileCard from '../components/ProfileCard';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <ProfileCard name="Jane Doe" email="jane@example.com" />
            <Button title="Log Out" onPress={() => alert('Logged out')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
