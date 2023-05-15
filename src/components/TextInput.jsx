import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 5,
    },
    borderError: {
        borderColor: theme.colors.error,
    },
    borderNormal: {
        borderColor: theme.colors.backgroundPrimary,
    }
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [
        style,
        styles.textInput,
        error && styles.borderError,
        !error && styles.borderNormal
    ];

    return <NativeTextInput style={textInputStyle} {...props}/>;
}

export default TextInput;