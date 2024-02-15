import {KeyboardAvoidingView, Platform} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {ProfileSafeAreaView} from 'screens/Profile/Profile';
import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';

import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {palette} from 'config/globalStyles';
import ChatOpenButton from 'components/ChatOpenButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useChatRoom} from 'lib/query/chat';
import ProfileImage from 'components/ProfileImage';
import {EditSVG} from '../../assets';
import useSocket from 'hooks/useSocket';
import {useChatOpen} from 'lib/mutation/chat';

import useCountdownTimer from 'hooks/useCountdown';
import {RootStackNavigationProp} from 'navigation/Routes';

export default function ChatRoom() {
  const ref = useRef(null);

  const {params} = useRoute();

  const navigation = useNavigation<RootStackNavigationProp>();
  const roomId = (params as {chatId: number})?.chatId;

  const {chatRoomData} = useChatRoom(roomId);
  const {useChatOpenMutation} = useChatOpen();

  const remainingTime = useCountdownTimer(chatRoomData?.disconnectTime ?? '');

  const {setMessage, message, sendMessage} = useSocket(roomId);

  return (
    <ProfileSafeAreaView>
      {chatRoomData?.chatUserData.chatStatus !== 'OPEN' ? (
        <ChatOpenButton onPress={() => useChatOpenMutation.mutate(roomId)} />
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={95}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <EndTimeBox>
            <EndTimeBoxText>
              대화 종료까지 남은 시간{' '}
              <MessageTimeEnd>{remainingTime}</MessageTimeEnd>
            </EndTimeBoxText>
          </EndTimeBox>

          <FlatList
            scrollEnabled
            inverted
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex: 1, padding: 16}}
            data={[]}
            renderItem={({item}) => {
              return (
                <>
                  <MessageGroup>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() =>
                        navigation.navigate('UserDetail', {
                          nickname: chatRoomData?.chatUserData.chatUserNickname,
                        })
                      }>
                      <ProfileImage
                        width={30}
                        height={30}
                        uri={chatRoomData?.chatUserData.preSignedUrl[0]}
                      />
                    </TouchableOpacity>
                    <MessageBoxContainer>
                      <MessageBox>{item.content}</MessageBox>
                    </MessageBoxContainer>
                  </MessageGroup>
                </>
              );
            }}
            keyExtractor={item => String(`${item.id}`)}
          />

          <MessageTextInputContainer>
            <MessageTextInput
              value={message}
              placeholder="메세지를 입력해주세요"
              onChangeText={text => setMessage(text)}
            />

            <InputSvgContainer onPress={event => sendMessage(event)}>
              <EditSVG width={20} height={20} />
            </InputSvgContainer>
          </MessageTextInputContainer>
        </KeyboardAvoidingView>
      )}
    </ProfileSafeAreaView>
  );
}

export const EndTimeBox = styled.View`
  width: 90%;

  margin-top: 12px;
  margin-bottom: 12px;

  text-align: center;
  display: flex;

  align-self: center;

  border-radius: 5px;
  background-color: 'rgba(233, 182, 0, 0.1)';
`;

export const EndTimeBoxText = styled.Text`
  padding: 12px;
  text-align: center;
`;

export const MessageTimeEnd = styled.Text`
  color: #e9b600;
`;

export const MessageWrapper = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

export const MessageTextInputContainer = styled.View`
  margin-top: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const MessageTextInput = styled.TextInput`
  width: 90%;
  height: 40px;
  align-self: center;

  border-width: 1px;
  border-radius: 10px;

  padding-left: 15px;
`;

export const MessageGroup = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;

  margin-bottom: 4px;
  gap: 6px;
`;

export const MessageBoxContainer = styled.View`
  border-radius: 5px;
  background-color: ${palette.buttonColor};

  margin-right: 16px;
  max-width: 90%;

  position: relative;
`;

export const MessageBox = styled.Text`
  color: ${palette.white};
  padding: 6px 14px;
  border-radius: 10px;
`;

export const InputSvgContainer = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 30px;
`;
