import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../Redux/actions';
import Post from '../../Post/Post';
import { RootState } from '../../../Redux/Reducers';
import { FlatList } from 'react-native-gesture-handler';

export const GlobalFeed = () => {
  const loading = useSelector((i: RootState) => i.postsReducer.loading);
  const dispatch = useDispatch();
  const posts = useSelector((i: RootState) => i.postsReducer.global);
  const renderItem = ({ item }) => <Post data={item} key={item.id} />;
  const [page, setPage] = useState(0);

  useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = async () => {
    dispatch(fetchPosts(`articles?limit=10&offset=0`, 'GLOBAL'));
  };
  const newPosts = () => {
    dispatch(
      fetchPosts(`articles?limit=10&offset=${page + 10}`, 'GLOBAL_NEXT')
    );
    setPage((prev) => prev + 10);
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      data={posts && posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.slug}
      onEndReached={newPosts}
      onEndReachedThreshold={0.05}
    />
  );
};
