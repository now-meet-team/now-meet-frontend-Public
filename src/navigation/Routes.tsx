import {Button, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp/SignUp';
import {useNavigationStore} from 'store/signup/signUpStore';
import Home from 'screens/Home/Home';
import Main from 'screens/Main/Main';
import Profile from 'screens/Profile/Profile';
import Setting from 'screens/Profile/Setting/Setting';
import Account from 'screens/Profile/Account/Account';
import UserDelete from 'screens/Profile/UserDelete/UserDelete';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
import {retrieveUserSession} from 'utils/auth';

import {useNavigation} from '@react-navigation/native';
import LikedMessageList from 'screens/Profile/LikedMessageList/LikedMessageList';
import EditUserProfile from 'screens/Profile/EditUserProfile/EditUserProfile';

const Stack = createNativeStackNavigator();
export default function Routes() {
  const navigation = useNavigation();

  const handlePrevPage = useNavigationStore(state => state.handlePrevPage);

  const checkAutoLogin = useCallback(async () => {
    try {
      const getToken = await retrieveUserSession('idToken');

      if (getToken) {
        navigation.navigate('Main' as never);
      }
    } catch (error) {
      console.error('자동 로그인 오류:', error);
    }
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast.show({
          type: 'error',
          text1: 'Network',
          text2:
            '데이터 또는 Wifi 연결 상태 확인 후 잠시 후 다시 시도해주세요.',
        });
      }

      // 컴포넌트 언마운트 시 구독 취소
      return () => {
        unsubscribe();
      };
    });

    // 컴포넌트가 마운트될 때 자동 로그인 체크
    checkAutoLogin();
  }, [checkAutoLogin]);

  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            headerShadowVisible: false,
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
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

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: '',
            headerLeft: () => {
              return (
                <View>
                  <Button
                    onPress={() => {
                      if (navigation.canGoBack()) {
                        navigation.goBack();
                      }
                    }}
                    title="<"
                    color="black"
                  />
                </View>
              );
            },
          }}
        />

        <Stack.Screen
          name="EditUserProfile"
          component={EditUserProfile}
          options={({navigation}) => ({
            title: '프로필 수정',

            headerLeft: () => (
              <View>
                <Button
                  title="<"
                  color="black"
                  onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    }
                  }}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="Setting"
          component={Setting}
          options={({navigation}) => ({
            title: '환경설정',

            headerLeft: () => (
              <View>
                <Button
                  title="<"
                  color="black"
                  onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    }
                  }}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="LikedMessageList"
          component={LikedMessageList}
          options={({navigation}) => ({
            title: '좋아요 발신함',

            headerLeft: () => (
              <View>
                <Button
                  title="<"
                  color="black"
                  onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    }
                  }}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="Account"
          component={Account}
          options={({navigation}) => ({
            title: '계정',

            headerLeft: () => (
              <View>
                <Button
                  title="<"
                  color="black"
                  onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    }
                  }}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="UserDelete"
          component={UserDelete}
          options={({navigation}) => ({
            title: '계정 삭제',

            headerLeft: () => (
              <View>
                <Button
                  title="<"
                  color="black"
                  onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    }
                  }}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>

      <Toast />
    </>
  );
}
