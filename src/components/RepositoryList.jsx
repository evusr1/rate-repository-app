import { FlatList, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native'
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './ItemSeparator';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import TextInput from './TextInput';


const RepositoryListHeader = ({sort, setSort, search, setSearch}) => {
  return (
    <>
      <Picker
        selectedValue={sort}
        onValueChange={value => setSort(value)}
      >
        <Picker.Item label="Latest repositories" value="LATEST"/>
        <Picker.Item label="Highest rated repositories" value="HIGHEST_RATING"/>
        <Picker.Item label="Lowest rated repositories" value="LOWEST_RATING"/>
      </Picker>
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={text => setSearch(text)}
      />
    </>
  )
} 


export const RepositoryListContainer = ({repositories, navigate, sort, setSort, search, setSearch}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [] ;
  

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryListHeader
          setSort={setSort}
          sort={sort}
          search={search}
          setSearch={setSearch}
        />
      }
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
  const [sort, setSort] = useState("LATEST");
  const [search, setSearch] = useState('');
  
  const [searchDebounce] = useDebounce(search, 500);
  
  const navigate = useNavigate();

  const { repositories } = useRepositories(sort, searchDebounce);


  return <RepositoryListContainer
    repositories={repositories}
    navigate={navigate}
    setSort={setSort}
    sort={sort}
    search={search}
    setSearch={setSearch}
  />
};

export default RepositoryList;