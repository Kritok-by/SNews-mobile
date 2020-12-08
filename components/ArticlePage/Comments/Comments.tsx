import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../../Redux/actions';

export const Comments = (slug: any, token: any) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  console.log(token.token);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (token.token) {
      await fetch(
        `https://conduit.productionready.io/api/articles/${slug}/comments`,
        {
          method: 'POST',
          body: JSON.stringify({ body: comment }),
          headers: {
            Authorization: `Token ${token.token}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
      dispatch(getComments(slug));
      setComment('');
    }
  };

  useEffect(() => {
    dispatch(getComments(slug.slug));
  }, []);

  return (
    <View style={s.block}>
      <TextInput
        value={comment}
        onChangeText={(t) => setComment(t)}
        placeholder={'Enter comment'}
        style={s.input}
        multiline={true}
      />
      <Button
        onPress={() => onSubmit()}
        title="Publish Comment"
        color="#be0016"
        accessibilityLabel="Publish article..."
      />
      {comments.map((i: {}, ind: number) => (
        <Text key={ind}>{i.body}</Text>
      ))}
    </View>
  );
};

const s = StyleSheet.create({
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    fontSize: 15,
  },
  input: {
    borderColor: '#ced4da',
    marginBottom: 10,
    width: '80%',
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
