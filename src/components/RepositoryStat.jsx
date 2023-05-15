import { StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
    flexContainer: {
        display: "flex",
        alignItems: 'center',
    },
})

const RepositoryStat = ({label, number}) => {
    const numberShortened = number < 1000 ? number : (number / 1000).toFixed(1) + "K";
    return (
        <View style={styles.flexContainer}>
            <Text color="textPrimary" fontWeight="bold">{numberShortened}</Text>
            <Text color="textSecondary">{label}</Text>
        </View>
    )
}

export default RepositoryStat;