import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../Redux/actions';
import Post from '../../Post/Post';
import { RootState } from '../../../Redux/Reducers';

export const YourFeed = () => {
  const loading = useSelector((i: RootState) => i.postsReducer.loading);
  const dispatch = useDispatch();
  const user = useSelector((i: RootState) => i.accountReducer.authUser);
  const posts = useSelector((i: RootState) => i.postsReducer.favorited);
  const [page, setPage] = useState(0);
  const renderItem = ({ item }) => <Post data={item} />;

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    dispatch(
      fetchPosts(`articles/feed?limit=10&offset=0`, 'FAVORITED', {
        Authorization: `Token ${user.user.token}`,
      })
    );
  };

  const nextPosts = () => {
    dispatch(
      fetchPosts(
        `articles/feed?limit=10&offset=${page + 10}`,
        'FAVORITED_NEXT',
        { Authorization: `Token ${user.user.token}` }
      )
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
      onEndReached={nextPosts}
      onEndReachedThreshold={0.05}
    />
  );
};
