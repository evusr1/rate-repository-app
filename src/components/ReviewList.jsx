import { FlatList, View, StyleSheet, Alert  } from 'react-native';
import { format } from 'date-fns';

import ItemSeparator from './ItemSeparator';
import theme from '../theme';
import Container from './Container';
import TextHeading from './TextHeading';
import TextSecondary from './TextSecondary';
import Text from "./Text";
import Button from './Button';
import { useNavigate } from 'react-router-native';
import useRemoveReview from '../hooks/useRemoveReview';

const styles = StyleSheet.create({
    buttonsBar: {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
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
    buttonHalf: {
        width: '50%',
        marginLeft: 15,
        marginRight: 15,
    }
});

const ReviewItem = ({ review, navigate, handleRemove, showReviewManageBar}) => {
    const reviewManageBar = () => (
        <View style={styles.buttonsBar}>
            <Button style={styles.buttonHalf} onPress={() => navigate(`/repo/${review.repositoryId}`)} label="View Repository"/>
            <Button style={styles.buttonHalf}  onPress={() => handleRemove(review.id)} color='danger' label="Delete Review"/>
        </View>        
    )
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
            {showReviewManageBar && reviewManageBar()}
        </Container>
        
    )
};
  

const ReviewList = ({reviewNodes, headerComponent, reloadReviews, myReview, onEndReach}) => {
    const navigate = useNavigate();
    const [removeReview] = useRemoveReview();

    const handleRemove = (id) => {
        Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [      {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
                try {
                    await removeReview(id);
                    reloadReviews();
                } catch(e) {
                    console.log(e);
                }
                
            },
          },
        ]);
    };

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} navigate={navigate} handleRemove={handleRemove} showReviewManageBar={myReview}/>}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={headerComponent}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
}

export default ReviewList;