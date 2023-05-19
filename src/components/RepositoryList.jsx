import { FlatList, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native'

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import ItemSeparator from './ItemSeparator';


export const RepositoryListContainer = ({repositories, navigate}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [] ;
  

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={item => item.id}
    />
  );
}

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  const navigate = useNavigate();
  if(loading)
    return <Text>Loading...</Text>

  return <RepositoryListContainer repositories={repositories} navigate={navigate}/>
};

export default RepositoryList;