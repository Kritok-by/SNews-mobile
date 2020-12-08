import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { LIKE } from '../../constants';
import { RootState } from '../../Redux/Reducers';
import { serviceFetch } from '../../serviceFetch/serviceFetch';
import moment from 'moment';
import { Comments } from './Comments/Comments';

export const ArticlePage = () => {
  const post: {} = useSelector((i: RootState) => i.postsReducer.currentPost);
  const user = useSelector((i: RootState) => i.accountReducer.authUser);
  const [like, setLike] = useState(post.favorited);
  const date = moment(post.createdAt).calendar();
  const LeftContent = () => (
    <Avatar.Image source={{ uri: post.author.image }} size={25} />
  );
  const onLike = () => {
    const method = like ? 'DELETE' : 'POST';
    serviceFetch(LIKE, method, user.user.token);
    setLike(!like);
  };

  return (
    <ScrollView>
      <Card style={s.wrapper}>
        <Card.Title
          title={post.author.username}
          titleStyle={{ fontSize: 12, lineHeight: 14, minHeight: 0 }}
          subtitle={date}
          subtitleStyle={{ fontSize: 10, lineHeight: 14 }}
          left={LeftContent}
          leftStyle={{
            marginHorizontal: 0,
            alignItems: 'flex-start',
            width: 25,
          }}
        />
        <Card.Content>
          <Title>{post.title}</Title>
          <Paragraph>{post.body}</Paragraph>
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'space-between' }}>
          {user.user && (
            <IconButton
              icon={like ? 'bookmark' : 'bookmark-outline'}
              color={like ? '#e84755' : '#595959'}
              size={20}
              onPress={onLike}
            />
          )}
        </Card.Actions>
      </Card>
      <Comments slug={post.slug} token={user.user.token} />
    </ScrollView>
  );
};

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  button: {
    paddingHorizontal: 0,
  },
});
