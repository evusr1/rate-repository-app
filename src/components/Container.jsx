import { View, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.backgroundSecondary,
        padding: 10,
    },
});

const Container = ({style, ...props}) => {
    const containerStyle = [
        style,
        styles.container
    ];

    return <View style={containerStyle} {...props} />
}

export default Container;