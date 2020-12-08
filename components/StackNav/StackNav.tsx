import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { ArticlePage } from '../ArticlePage/ArticlePage';
import { Main } from '../Main/Main';

const Stack = createStackNavigator();
export const StackNav = () => {
  const post = useSelector((i) => i.postsReducer.currentPost);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ArticlePage'}
        component={ArticlePage}
        options={{
          headerTintColor: '#be0016',
          title: post.title,
        }}
      />
    </Stack.Navigator>
  );
};
