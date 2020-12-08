import { mdiLinkedin } from '@mdi/js';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { serviceFetch } from '../../serviceFetch/serviceFetch';
import { LIKE } from '../../constants';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Reducers';
import { useNavigation } from '@react-navigation/native';
import { currentPost } from '../../Redux/actions';
import moment from 'moment';

const Post = ({ data }) => {
  const user = useSelector((i: RootState) => i.accountReducer.authUser);
  const nav = useNavigation();
  const [like, setLike] = useState(data.favorited);
  const dispatch = useDispatch();
  const date = moment(data.createdAt).calendar();
  const LeftContent = () => (
    <Avatar.Image source={{ uri: data.author.image }} size={25} />
  );
  const onLike = () => {
    const method = like ? 'DELETE' : 'POST';
    serviceFetch(LIKE, method, user.user.token);
    setLike(!like);
  };

  return (
    <Card
      style={style.card}
      onPress={() => {
        dispatch(currentPost(data));
        nav.navigate('ArticlePage');
      }}
    >
      <Card.Title
        title={data.author.username}
        titleStyle={{ fontSize: 12, lineHeight: 14, minHeight: 0 }}
        subtitle={date}
        subtitleStyle={{ fontSize: 10, lineHeight: 14 }}
        left={LeftContent}
        leftStyle={{ marginHorizontal: 0, alignItems: 'flex-start', width: 25 }}
      />
      <Card.Content>
        <Title style={{ marginBottom: 10 }}>{data.title}</Title>
        <Paragraph>{data.description}</Paragraph>
      </Card.Content>
      <Card.Actions style={{ justifyContent: 'space-between' }}>
        <View style={style.tags}>
          {data.tagList.map((i, ind) => (
            <Button
              labelStyle={style.tag}
              compact={true}
              color="#ced4da"
              mode="text"
              key={ind}
            >{`#${i}`}</Button>
          ))}
        </View>
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
  );
};

const style = StyleSheet.create({
  card: {
    width: '97%',
    marginVertical: 5,
    borderRadius: 4,
    alignSelf: 'center',
  },
  tag: {
    fontSize: 10,
    marginHorizontal: 0,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Post;
