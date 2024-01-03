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

import LikedMessageList from 'screens/Profile/LikedMessageList/LikedMessageList';
import EditUserProfile from 'screens/Profile/EditUserProfile/EditUserProfile';
import JobScreen from 'screens/SignUp/JobScreen/JobScreen';
import SelfScreen from 'screens/SignUp/SelfScreen/SelfScreen';
import HobbyScreen from 'screens/SignUp/HobbyScreen/HobbyScreen';
import {useNavigation} from '@react-navigation/native';
import NavigateBack from 'components/Common/NavigateBack/NavigateBack';

const Stack = createNativeStackNavigator();
export default function Routes() {
  const navigation = useNavigation();

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
    // checkAutoLogin();
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast.show({
          type: 'error',
          text1: 'Network',
          text2:
            '데이터 또는 Wifi 연결 상태 확인 후 잠시 후 다시 시도해주세요.',
        });
      }
      return () => {
        unsubscribe();
      };
    });
  }, []);

  const MemoizedNavigateBackComponent = React.useCallback(
    () => <NavigateBack />,
    [],
  );

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
          options={() => ({
            headerShadowVisible: false,
            headerTitle: '',

            headerLeft: () => MemoizedNavigateBackComponent(),
          })}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: '',
            headerLeft: () => MemoizedNavigateBackComponent(),
          }}
        />

        <Stack.Screen
          name="EditUserProfile"
          component={EditUserProfile}
          options={() => ({
            title: '프로필 수정',

            headerLeft: () => MemoizedNavigateBackComponent(),
          })}
        />

        <Stack.Screen
          name="Setting"
          component={Setting}
          options={() => ({
            title: '환경설정',

            headerLeft: () => MemoizedNavigateBackComponent(),
          })}
        />

        <Stack.Screen
          name="LikedMessageList"
          component={LikedMessageList}
          options={() => ({
            title: '좋아요 발신함',

            headerLeft: () => MemoizedNavigateBackComponent(),
          })}
        />

        <Stack.Screen
          name="Account"
          component={Account}
          options={() => ({
            title: '계정',

            headerLeft: () => MemoizedNavigateBackComponent(),
          })}
        />

        <Stack.Screen
          name="UserDelete"
          component={UserDelete}
          options={() => ({
            title: '계정 삭제',

            headerLeft: () => MemoizedNavigateBackComponent(),
          })}
        />

        <Stack.Screen
          name="EditJob"
          component={JobScreen}
          options={() => ({
            title: '직업 수정',

            headerLeft: () => MemoizedNavigateBackComponent(),
          })}
        />

        <Stack.Screen
          name="EditIntroduction"
          component={SelfScreen}
          options={() => ({
            title: '자기소개 수정',

            headerLeft: () => MemoizedNavigateBackComponent(),
          })}
        />

        <Stack.Screen
          name="EditPreference"
          component={HobbyScreen}
          options={() => ({
            title: '취향 수정',

            headerLeft: () => MemoizedNavigateBackComponent(),
          })}
        />
      </Stack.Navigator>

      <Toast />
    </>
  );
}
