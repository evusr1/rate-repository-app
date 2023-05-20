import { Link } from 'react-router-native';
import { StyleSheet, View } from 'react-native';

import Text from '../Text';

const styles = StyleSheet.create({
    appBarItem: {
        padding: 15,
    },
})

const AppBarLink = ({to, label}) => {
    return (
        <View style={styles. appBarItem}>
            <Link to={to}>
                <Text fontWeight="bold" fontSize="subheading" color="invert">
                    {label}
                </Text> 
            </Link>
        </View>
    );
};

export default AppBarLink;