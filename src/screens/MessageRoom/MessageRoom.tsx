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

export default function MessageRoom() {
  return (
    <ProfileSafeAreaView>
      <FlatList
        scrollEnabled={true}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={({item, index}) => {
          return (
            <>
              <MessageUserInfo key={item}>
                <MessageUserImage source={{uri: ''}} alt="userMainImage" />
                <View>
                  <ProfileUserDetailName>{'안녕하세여'}</ProfileUserDetailName>
                  <LastMessage>{'대화가 연결되었습니다.'}</LastMessage>
                </View>
              </MessageUserInfo>
            </>
          );
        }}
        keyExtractor={(item, index) => String(` ${index}`)}
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
