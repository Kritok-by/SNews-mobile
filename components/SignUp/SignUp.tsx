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
import { reg } from '../../Redux/actions';

export const SignUp = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();
  const eror = useSelector((i) => i.accountReducer.authUser);

  const onSubmit = () => {
    dispatch(
      reg({
        user: { email: email, password: pass, username: user },
      })
    );
    setUser('');
    setEmail('');
    setPass('');
  };
  return (
    <ScrollView>
      <View style={s.body}>
        <TextInput
          value={user}
          onChangeText={(t) => setUser(t)}
          placeholder={'Enter username'}
          style={s.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          value={email}
          onChangeText={(t) => setEmail(t)}
          placeholder={'Enter email'}
          textContentType="emailAddress"
          style={s.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          value={pass}
          onChangeText={(t) => setPass(t)}
          placeholder={'Enter password'}
          textContentType="password"
          style={s.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          onPress={() => onSubmit()}
          title="Sign Up"
          color="#be0016"
          accessibilityLabel="Registration..."
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
