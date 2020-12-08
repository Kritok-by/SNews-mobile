import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const auth = (data: {}) => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(
        'https://conduit.productionready.io/api/users/login',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
      const user = await res.json();
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('currUser', jsonValue);
      if (user.user) {
        dispatch({
          type: 'AUTHORIZE',
          user,
        });
      } else if (user.errors) {
        dispatch({
          type: 'AUTHORIZE',
          user,
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const updateUser = (data: {}) => {
  return async (dispatch: any) => {
    try {
      const res = await fetch('https://conduit.productionready.io/api/user', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${data.user.token}`,
        },
      });
      const user = await res.json();
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('currUser', jsonValue);
      if (user.user) {
        dispatch({
          type: 'AUTHORIZE',
          user,
        });
      } else if (user.errors) {
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
        Alert.alert('Incorrect data', alertErrors());
      }
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const clearUserData = () => ({
  type: 'AUTHORIZE',
  user: {},
});

export const storeAuth = () => async (dispatch: any) => {
  try {
    const value = await AsyncStorage.getItem('currUser');
    if (value !== null) {
      dispatch({
        type: 'AUTHORIZE',
        user: JSON.parse(value),
      });
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const reg = (data: {}) => {
  return async (dispatch: any) => {
    try {
      const res = await fetch('https://conduit.productionready.io/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      const user = await res.json();
      if (user.user) {
        dispatch({
          type: 'AUTHORIZE',
          user,
        });
      } else if (user.errors) {
        dispatch({
          type: 'AUTHORIZE',
          user,
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const fetchPosts = (
  url: string,
  type: string,
  header: {} = {}
) => async (dispatch: any) => {
  try {
    dispatch(loading(true));
    const res = await fetch(`https://conduit.productionready.io/api/${url}`, {
      method: 'GET',
      headers: {
        ...header,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    const posts = await res.json();
    dispatch({
      type: type,
      posts: posts.articles,
    });
    dispatch(loading(false));
  } catch (e) {}
};

export const currentPost = (data: {}) => ({
  type: 'CURRENT_POST',
  data,
});

export const loading = (loading: boolean) => ({
  type: 'LOADING',
  loading,
});

export const getComments = (slug: String) => async (dispatch: any) => {
  const res = await fetch(
    `https://conduit.productionready.io/api/articles/${slug}/comments`
  );
  const data = await res.json();

  dispatch({
    type: 'GET_COMMENTS',
    data: data.comments,
  });
};
