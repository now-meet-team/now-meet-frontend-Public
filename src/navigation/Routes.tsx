import {Button, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp/SignUp';
import {useNavigationStore} from 'store/signup/signUpStore';
import Home from 'screens/Home/Home';

const Stack = createNativeStackNavigator();
export default function Routes() {
  const handlePrevPage = useNavigationStore(state => state.handlePrevPage);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShadowVisible: false,
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShadowVisible: false,
            headerTitle: '',

            headerLeft: () => (
              <View>
                <Button
                  onPress={() => handlePrevPage()}
                  title="<"
                  color="black"
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
