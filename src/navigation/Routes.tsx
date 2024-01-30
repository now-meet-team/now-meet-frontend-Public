import React, {useCallback, useEffect} from 'react';

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp/SignUp';

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
import UserDetail from 'screens/UserDetail/UserDetail';
import MessageRoom from 'screens/MessageRoom/MessageRoom';
import {Text} from 'react-native';
import InBox from 'screens/InBox/InBox';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

export type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  SignUp: undefined;
  Profile: undefined;
  LikedMessageList: undefined;
  EditUserProfile: undefined;
  Setting: undefined;
  Account: undefined;
  UserDelete: undefined;
  EditJob: undefined;
  EditIntroduction: undefined;
  EditPreference: undefined;
  Inbox: undefined;
  UserDetail: {
    nickname: string;
  };

  MessageRoom: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
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
    checkAutoLogin();
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
          options={() => ({
            headerShadowVisible: false,
            headerTitle: '',

            headerLeft: () => <NavigateBack label={'SignUp'} />,
          })}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: '내 정보',

            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="EditUserProfile"
          component={EditUserProfile}
          options={() => ({
            headerTitle: '프로필 수정',

            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
          })}
        />

        <Stack.Screen
          name="Setting"
          component={Setting}
          options={() => ({
            title: '환경설정',

            headerLeft: props => <NavigateBack label={props.label || ''} />,
          })}
        />

        <Stack.Screen
          name="LikedMessageList"
          component={LikedMessageList}
          options={() => ({
            title: '보낸 좋아요',
            headerStyle: {backgroundColor: '#fff', borderBottomWidth: 0},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
          })}
        />

        <Stack.Screen
          name="Account"
          component={Account}
          options={() => ({
            title: '계정',

            headerLeft: props => <NavigateBack label={props.label || ''} />,
          })}
        />

        <Stack.Screen
          name="UserDelete"
          component={UserDelete}
          options={() => ({
            title: '계정 삭제',

            headerLeft: props => <NavigateBack label={props.label || ''} />,
          })}
        />

        <Stack.Screen
          name="EditJob"
          component={JobScreen}
          options={() => ({
            headerTitle: '직업 수정',

            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
          })}
        />

        <Stack.Screen
          name="EditIntroduction"
          component={SelfScreen}
          options={() => ({
            title: '자기소개 수정',

            headerLeft: props => <NavigateBack label={props.label || ''} />,
          })}
        />

        <Stack.Screen
          name="EditPreference"
          component={HobbyScreen}
          options={() => ({
            title: '취향 수정',

            headerLeft: props => <NavigateBack label={props.label || ''} />,
          })}
        />

        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={() => ({
            title: '상세페이지',
            headerStyle: {backgroundColor: '#fff', borderBottomWidth: 0},
            headerTintColor: '#000',
            headerShadowVisible: false, // applied here
          })}
        />

        <Stack.Screen
          name="MessageRoom"
          component={MessageRoom}
          options={() => ({
            title: '채팅방',
            headerStyle: {backgroundColor: '#fff', borderBottomWidth: 0},
            headerTintColor: '#000',
            headerShadowVisible: false, // applied here

            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Inbox' as never)}>
                <Text>요청함</Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Inbox"
          component={InBox}
          options={() => ({
            title: '요청함',
            headerStyle: {backgroundColor: '#fff', borderBottomWidth: 0},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Navigator>

      <Toast />
    </>
  );
}
