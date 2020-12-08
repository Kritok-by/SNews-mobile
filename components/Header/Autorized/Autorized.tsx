import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Main } from '../../Main/Main';
import { NewArticle } from '../../NewArticle/NewArticle';
import { StackNav } from '../../StackNav/StackNav';
import { UserSettings } from '../../UserSettings/UserSettings';

const Tab = createMaterialBottomTabNavigator();
export const Autorized = () => (
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
              case 'NewArticle':
                iconName = focused ? 'plus-square' : 'plus-square-o';
                break;
              case 'Settings':
                iconName = 'gear';
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
        <Tab.Screen name="NewArticle" component={NewArticle} />
        <Tab.Screen name="Settings" component={UserSettings} />
      </Tab.Navigator>
    </NavigationContainer>
  </View>
);
