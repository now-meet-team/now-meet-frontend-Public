import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ProfileSafeAreaView} from 'screens/Profile/Profile';
import {
  ProfileUserDetailImage,
  ProfileUserDetailInfo,
  ProfileUserDetailName,
  ProfileUserDetailWrapper,
} from 'screens/UserDetail/UserDetail';
import styled from 'styled-components/native';
import {useChatList} from 'lib/query/chat';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'navigation/Routes';

export default function ChatList() {
  const {chatListData} = useChatList();

  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <ProfileSafeAreaView>
      <FlatList
        scrollEnabled={true}
        data={chatListData}
        renderItem={({item}) => {
          return (
            <>
              <MessageUserInfo>
                <MessageUserImage
                  source={{uri: item.preSignedUrl[0]}}
                  alt="chatImage"
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChatRoom', {
                      name: item.matchUserNickname,
                      chatId: item.chatId,
                    })
                  }>
                  <ProfileUserDetailName>
                    {item.matchUserNickname}
                  </ProfileUserDetailName>
                  <LastMessage>{item?.lastMessage}</LastMessage>
                </TouchableOpacity>
              </MessageUserInfo>
            </>
          );
        }}
        keyExtractor={item => String(` ${item.chatId}`)}
      />
    </ProfileSafeAreaView>
  );
}

export const MessageWrapper = styled(ProfileUserDetailWrapper)`
  margin-top: 30px;
  padding-left: 20px;
`;

export const MessageUserImage = styled(ProfileUserDetailImage)`
  width: 70px;
  height: 70px;

  border-radius: 50px;

  border-width: 1px;
`;

export const MessageUserInfo = styled(MessageWrapper)`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const LastMessage = styled(ProfileUserDetailInfo)`
  margin-top: 3px;
  font-size: 13px;
`;
