import React from 'react';
import {BackArrow} from 'assets';
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

import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';

import LikedMessageList from 'screens/Profile/LikedMessageList/LikedMessageList';
import EditUserProfile from 'screens/Profile/EditUserProfile/EditUserProfile';
import JobScreen from 'screens/SignUp/JobScreen/JobScreen';
import SelfScreen from 'screens/SignUp/SelfScreen/SelfScreen';
import HobbyScreen from 'screens/SignUp/HobbyScreen/HobbyScreen';
import {useNavigation} from '@react-navigation/native';
import UserDetail from 'screens/UserDetail/UserDetail';

import {ActivityIndicator, Text} from 'react-native';
import InBox from 'screens/InBox/InBox';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import CustomerService from 'screens/Profile/CustomerService/CustomerService';
import ChatList from 'screens/ChatList/ChatList';
import ChatRoom from 'screens/ChatRoom/ChatRoom';
import useAuth from 'hooks/useAuth';
import useNetworkStatus from 'hooks/useNetworkStatus';
import NetworkError from 'screens/NetworkError/NetworkError';

import ChatRightExit from 'components/Chat/ChatRightExit';

import NavigateBack from 'components/Common/NavigateBack/NavigateBack';
import useNotification from 'hooks/useNotification';

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

  CustomerService: undefined;

  ChatList: undefined;
  ChatRoom: {
    chatId: number;
    name: string;
  };

  NetworkError: undefined;
  ChatExitModal: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const navigation = useNavigation();
  const {userToken, loading} = useAuth();

  useNetworkStatus();
  useNotification();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Stack.Navigator initialRouteName={userToken !== null ? 'Main' : 'Home'}>
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
            headerTitle: '',
            headerLeft: () => <NavigateBack label="SignUp" />,
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
            title: '환경 설정',
            headerStyle: {backgroundColor: '#fff', borderBottomWidth: 0},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
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

            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
          })}
        />

        <Stack.Screen
          name="UserDelete"
          component={UserDelete}
          options={() => ({
            title: '계정 삭제',

            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
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
            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
          })}
        />

        <Stack.Screen
          name="EditPreference"
          component={HobbyScreen}
          options={() => ({
            title: '취향 수정',

            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
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
          name="ChatList"
          component={ChatList}
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
          name="ChatRoom"
          component={ChatRoom}
          options={({route}) => ({
            title: route.params?.name,
            headerStyle: {backgroundColor: '#fff', borderBottomWidth: 0},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={{marginRight: 30}}
                onPress={() => navigation.goBack()}>
                <BackArrow />
              </TouchableOpacity>
            ),

            headerRight: () => {
              return <ChatRightExit chatId={route.params.chatId} />;
            },
            headerBackTitleVisible: false,
            headerBackVisible: false,
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

        <Stack.Screen
          name="CustomerService"
          component={CustomerService}
          options={() => ({
            title: '고객센터',
            headerStyle: {backgroundColor: '#fff', borderBottomWidth: 0},
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
          })}
        />

        <Stack.Screen
          name="NetworkError"
          component={NetworkError}
          options={() => ({
            title: 'Network Error',

            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerBackVisible: false,
          })}
        />
      </Stack.Navigator>

      <Toast />
    </>
  );
}
