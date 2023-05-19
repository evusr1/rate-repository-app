import { FlatList, View, StyleSheet  } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from '../theme';
import Container from './Container';
import TextHeading from './TextHeading';
import TextSecondary from './TextSecondary';
import ItemSeparator from './ItemSeparator';

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

    rating: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderWidth: 3,
        borderColor: theme.colors.primary,
        borderStyle: "solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        padding: 10,
        flexShrink: 1,
        justifyContent: "flex-start",
    },
    
});

const RepositoryInfo = ({ repository }) => {
    return (
        <>
            <RepositoryItem item={repository} showUrlButton={true} />
            <ItemSeparator/>
        </>
    )
};
  
const ReviewItem = ({ review }) => {
    return (
        <Container>
            <View style={styles.descriptionContainer}>
                <View style={styles.item}>
                    <View style={styles.rating}>
                        <Text color="primary" fontWeight="bold">{review.rating}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.descriptionText}>
                        <TextHeading>{review.user.username}</TextHeading>
                        <TextSecondary>{format(new Date(review.createdAt), 'MM/dd/yyyy')}</TextSecondary>
                        <View>
                            <Text>{review.text}</Text>
                        </View>
                    </View>
                </View>
            </View>            
        </Container>
    )
};
  

const RepositoryView = () => {
    const id = useParams().id;
    const {repository, loading} = useRepository(id);

    if(loading || !repository)
        return <Text>Loading...</Text>

    const reviewNodes = repository.reviews
        ? repository.reviews.edges.map(edge => edge.node)
        : [] ;
    
    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
}

export default RepositoryView;