import { View, StyleSheet, Image } from "react-native";

import Text from "./Text";
import theme from "../theme";
import RepositoryStat from "./RepositoryStat";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.backgroundSecondary,
        padding: 10,
    },
    statsBarFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    descriptionContainer: {
        display: "flex",
        flexDirection: "row",     
    },
    descriptionText: {
        marginBottom: 10,
    },
    languageBadge: {
        padding: 5,
        alignSelf: "flex-start",
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
    },
    tinyAvatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    item: {
        padding: 10,
        flexShrink: 1,
        justifyContent: "flex-start",
    },
    
  });

const RepositoryItem = ({item}) => {
    return (
        <View style={styles.container} testID="repositoryItem">
            <View style={styles.descriptionContainer}>
                <View style={styles.item}>
                    <Image
                        source={{
                            uri: item.ownerAvatarUrl,
                        }}
                        style={styles.tinyAvatar}
                    />
                </View>
                <View style={styles.item}>
                    <View style={styles.descriptionText}>
                        <Text fontSize="subheading" fontWeight="bold">{item.fullName}</Text>
                        <Text color="textSecondary">{item.description}</Text>
                    </View>
            
                    <View style={styles.languageBadge}>
                        <Text color="invert">{item.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.statsBarFlex}>
                <RepositoryStat number={item.stargazersCount} label="Stars"/>
                <RepositoryStat number={item.forksCount} label="Forks"/>
                <RepositoryStat number={item.reviewCount} label="Reviews"/>
                <RepositoryStat number={item.ratingAverage} label="Rating"/>
            </View>
        </View>
    );
}

export default RepositoryItem;