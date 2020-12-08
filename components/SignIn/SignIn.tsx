import React, { useEffect, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Redux/actions';

export const SignIn = ({ navigaton }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((i) => i.accountReducer.authUser);

  const onSubmit = () => {
    dispatch(
      auth({
        user: { email: email, password: pass },
      })
    );
    setEmail('');
    setPass('');
  };
  user.user && navigaton.navigate('Feed');
  return (
    <ScrollView>
      <View style={s.body}>
        <TextInput
          value={email}
          onChangeText={(t) => setEmail(t)}
          placeholder={'Enter your email'}
          textContentType="emailAddress"
          style={s.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          value={pass}
          onChangeText={(t) => setPass(t)}
          placeholder={'Enter your password'}
          textContentType="password"
          style={s.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          onPress={() => onSubmit()}
          title="Sign In"
          color="#be0016"
          accessibilityLabel="Learn more about this purple button"
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
