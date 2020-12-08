import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { SignIn } from '../../SignIn/SignIn';
import { SignUp } from '../../SignUp/SignUp';
import { StackNav } from '../../StackNav/StackNav';

const Tab = createMaterialBottomTabNavigator();

export const NotAutorized = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Main"
        inactiveColor="#ffffff"
        activeColor="#be0016"
        barStyle={{ backgroundColor: '#000000' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            switch (route.name) {
              case 'SignIn':
                iconName = 'sign-in';
                break;
              case 'SignUp':
                iconName = 'user-plus';
                break;
              default:
                iconName = 'feed';
                break;
            }
            return <FontAwesome name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Feed" component={StackNav} />
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="SignUp" component={SignUp} />
      </Tab.Navigator>
    </NavigationContainer>
  </View>
);
