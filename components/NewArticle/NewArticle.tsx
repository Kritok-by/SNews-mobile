import React, { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reg } from '../../Redux/actions';

export const NewArticle = ({ navigation }) => {
  const [form, setForm] = useState({
    tagList: '',
    title: '',
    description: '',
    body: '',
  });
  const user = useSelector((i) => i.accountReducer.authUser.user);

  const onSubmit = async () => {
    try {
      await fetch(`https://conduit.productionready.io/api/articles/`, {
        method: 'POST',
        body: JSON.stringify({
          article: {
            tagList: form.tagList.split('#').reverse(),
            title: form.title,
            description: form.description,
            body: form.body,
          },
        }),
        headers: {
          Authorization: `Token ${user.token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      await navigation.navigate('Feed');
      setForm({
        tagList: '',
        title: '',
        description: '',
        body: '',
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <ScrollView>
      <View style={s.body}>
        <TextInput
          value={form.title}
          onChangeText={(t) => setForm((prev) => ({ ...prev, title: t }))}
          placeholder={'Article Titile'}
          style={s.input}
          multiline={true}
        />
        <TextInput
          value={form.description}
          onChangeText={(t) => setForm((prev) => ({ ...prev, description: t }))}
          placeholder={`What's is article about`}
          style={s.input}
          multiline={true}
        />
        <TextInput
          value={form.body}
          onChangeText={(t) => setForm((prev) => ({ ...prev, body: t }))}
          placeholder={'Write your article (in markdown)'}
          style={s.input}
          multiline={true}
        />
        <TextInput
          value={form.tagList}
          onChangeText={(t) => setForm((prev) => ({ ...prev, tagList: t }))}
          placeholder={'Enter tags'}
          style={s.input}
          multiline={true}
        />

        <Button
          onPress={() => onSubmit()}
          title="Publish Article"
          color="#be0016"
          accessibilityLabel="Publish article..."
        />
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 200,
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
