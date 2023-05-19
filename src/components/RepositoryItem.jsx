import { View, StyleSheet, Image } from "react-native";
import { Linking } from "react-native";

import Text from "./Text";
import theme from "../theme";
import RepositoryStat from "./RepositoryStat";
import Button from "./Button";
import Container from "./Container";
import TextHeading from "./TextHeading";
import TextSecondary from "./TextSecondary";


const styles = StyleSheet.create({
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

const RepositoryItem = ({item, showUrlButton}) => {
    return (
        <Container testID="repositoryItem">
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
                        <TextHeading>{item.fullName}</TextHeading>
                        <TextSecondary>{item.description}</TextSecondary>
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
            {
                showUrlButton &&
                    <View>
                        <Button label="Open in GitHub" onPress={() => Linking.openURL(item.url)}/>
                    </View>
            }
        </Container>
    );
}

export default RepositoryItem;