import { Pressable, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    borderRadius: 5,
  },
});

const Button = ({ onSubmit, style, label, ...props }) => {
  const buttonStyle = [
    style,
    styles.button
  ];

  return (
    <Pressable onPress={onSubmit} style={buttonStyle} {...props}>
      <Text color="invert">{label}</Text>
    </Pressable>
  );
};

export default Button;