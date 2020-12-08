import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, updateUser } from '../../Redux/actions';

export const UserSettings = () => {
  const user = useSelector((i) => i.accountReducer.authUser.user);
  const navigator = useNavigation();
  const [form, setForm] = useState({
    user: {
      bio: user.bio || '',
      createdAt: user.createdAt,
      email: user.email || '',
      id: user.id,
      image: user.image || '',
      password: '',
      token: user.token,
      updatedAt: new Date().toISOString(),
      username: user.username,
    },
  });
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(updateUser(form));
    navigator.navigate('Feed');
  };
  const logOut = async () => {
    dispatch(clearUserData());
    await AsyncStorage.removeItem('currUser');
    navigator.navigate('Feed');
  };

  return (
    <ScrollView>
      <View style={s.body}>
        <TextInput
          value={form.user.image}
          onChangeText={(t) =>
            setForm((prev) => ({ user: { ...prev.user, image: t } }))
          }
          placeholder={'URL of profile picture'}
          style={s.input}
          multiline={true}
        />
        <TextInput
          value={form.user.username}
          onChangeText={(t) =>
            setForm((prev) => ({ user: { ...prev.user, username: t } }))
          }
          placeholder={`New username`}
          style={s.input}
          multiline={true}
        />
        <TextInput
          value={form.user.bio}
          onChangeText={(t) =>
            setForm((prev) => ({ user: { ...prev.user, bio: t } }))
          }
          placeholder={'Short bio about you'}
          style={s.input}
          multiline={true}
        />
        <TextInput
          value={form.user.email}
          onChangeText={(t) =>
            setForm((prev) => ({ user: { ...prev.user, email: t } }))
          }
          placeholder={'New email'}
          style={s.input}
          multiline={true}
        />
        <TextInput
          value={form.user.password}
          onChangeText={(t) =>
            setForm((prev) => ({ user: { ...prev.user, password: t } }))
          }
          placeholder={'New password'}
          style={s.input}
          multiline={true}
        />
        <Button
          onPress={onSubmit}
          title="Update settings"
          color="#be0016"
          accessibilityLabel="Updating..."
        />
        <Button
          onPress={logOut}
          title="Logout"
          color="#be0016"
          accessibilityLabel="Clearing your data..."
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
