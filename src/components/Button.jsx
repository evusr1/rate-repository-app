import { Pressable, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    borderRadius: 5,
  },
  buttonNormal: {
    backgroundColor: theme.colors.primary,
  },
  buttonDanger: {
    backgroundColor: theme.colors.error,
  }
});

const Button = ({ style, label, color = 'normal',...props }) => {
  const buttonStyle = [
    style,
    styles.button,
    color === 'danger' && styles.buttonDanger,
    color === 'normal' && styles.buttonNormal
  ];

  return (
    <Pressable style={buttonStyle} {...props}>
      <Text color="invert">{label}</Text>
    </Pressable>
  );
};

export default Button;