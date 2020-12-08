import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NotAutorized } from './NotAutorized/NotAutorized';
import { useDispatch, useSelector } from 'react-redux';
import { Autorized } from './Autorized/Autorized';
import { RootState } from '../../Redux/Reducers';
import { storeAuth } from '../../Redux/actions';

export const Header = () => {
  const user = useSelector((i: RootState) => i.accountReducer.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storeAuth());
  }, []);
  const alertErrors = () => {
    let errors: string = '';
    for (let value in user.errors) {
      errors += user.errors[value].map(
        (i: string) => `
      ${value} ${i}`
      );
    }
    return errors;
  };
  user.errors && Alert.alert('Incorrect data', alertErrors());

  return <>{user.user ? <Autorized /> : <NotAutorized />}</>;
};
