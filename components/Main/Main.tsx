import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalFeed } from './GlobalFeed/GlobalFeed';
import { YourFeed } from './YourFeed/YourFeed';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Reducers';
import { Button, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();
export function Main() {
  const user = useSelector((i: RootState) => i.accountReducer.authUser);
  return (
    <Tab.Navigator
      style={{
        backgroundColor: '#ffffff',
      }}
      tabBarOptions={{
        indicatorStyle: { backgroundColor: '#be0016' },
        style: {
          paddingTop: 26,
        },
      }}
    >
      {user.user && <Tab.Screen name="Your Feed" component={YourFeed} />}
      <Tab.Screen name="Global Feed" component={GlobalFeed} />
    </Tab.Navigator>
  );
}
