import {KeyboardAvoidingView, Platform} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef} from 'react';
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

import {RootStackNavigationProp} from 'navigation/Routes';
import EndTimeBox from 'components/Chat/EndTimeBox';

export default function ChatRoom() {
  const {params} = useRoute();

  const navigation = useNavigation<RootStackNavigationProp>();
  const roomId = (params as {chatId: number})?.chatId;

  const {chatRoomData} = useChatRoom(roomId);
  const {useChatOpenMutation} = useChatOpen();

  const {setMessage, message, sendMessage, messages, setMessages} =
    useSocket(roomId);

  console.log(messages);

  useEffect(() => {
    if (chatRoomData) {
      setMessages(
        chatRoomData.chatUserData.message.map(message =>
          String(message.content),
        ),
      );
    }
  }, [chatRoomData, setMessages]);

  return (
    <ProfileSafeAreaView>
      {chatRoomData?.chatUserData.chatStatus !== 'OPEN' ? (
        <ChatOpenButton onPress={() => useChatOpenMutation.mutate(roomId)} />
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={95}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <EndTimeBox disconnectTime={chatRoomData?.disconnectTime ?? ''} />

          <FlatList
            scrollEnabled
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex: 1, padding: 16}}
            data={messages}
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
                      <MessageBox>{item}</MessageBox>
                    </MessageBoxContainer>
                  </MessageGroup>
                </>
              );
            }}
            keyExtractor={(item, index) => String(`${item + index}`)}
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
