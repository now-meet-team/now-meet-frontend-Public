import {KeyboardAvoidingView, Platform} from 'react-native';
import React from 'react';
import {ProfileSafeAreaView} from 'screens/Profile/Profile';
import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';

import ChatOpenButton from 'components/ChatOpenButton';
import {useRoute} from '@react-navigation/native';
import {useChatRoom} from 'lib/query/chat';

import useSocket from 'hooks/useSocket';
import {useChatOpen} from 'lib/mutation/chat';

import EndTimeBox from 'components/Chat/EndTimeBox';
import {ChatStatus} from 'types/chat';

import ChatInput from 'components/Chat/ChatInput';
import MessageList from 'components/Chat/MessageList';

export default function ChatRoom() {
  const {params} = useRoute();

  const roomId = (params as {chatId: number})?.chatId;

  const {chatRoomData} = useChatRoom(roomId);
  const {useChatOpenMutation} = useChatOpen();

  const {chatRoomStatus, setMessage, message, sendMessage, messages} =
    useSocket(roomId);

  return (
    <ProfileSafeAreaView>
      {chatRoomData?.chatUserData?.chatStatus === ChatStatus.PENDING ? (
        <ChatOpenButton onPress={() => useChatOpenMutation.mutate(roomId)} />
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={95}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <EndTimeBox
            status={chatRoomData?.chatUserData.chatStatus ?? ''}
            chatTime={chatRoomData?.chatTime ?? ''}
          />

          <FlatList
            inverted
            keyExtractor={item => String(`${item.id}`)}
            showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            initialNumToRender={10}
            maxToRenderPerBatch={6}
            scrollEnabled
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex: 1, padding: 16}}
            data={[...messages].flat().reverse()}
            renderItem={({item}) => {
              return (
                <MessageList
                  status={
                    (chatRoomStatus || chatRoomData?.chatUserData.chatStatus) ??
                    ''
                  }
                  item={item}
                  chatProfileUrl={
                    chatRoomData?.chatUserData.preSignedUrl[0] ?? ''
                  }
                  chatUserNickname={
                    chatRoomData?.chatUserData.chatUserNickname ?? ''
                  }
                />
              );
            }}
          />

          <ChatInput
            disabled={
              chatRoomStatus === ChatStatus.RECEIVER_EXIT ||
              chatRoomStatus === ChatStatus.SENDER_EXIT
            }
            value={message}
            onChangeText={setMessage}
            onSubmit={event =>
              sendMessage(
                event,
                chatRoomData?.chatUserData.chatUserNickname || '',
              )
            }
          />
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
  padding-right: 35px;
`;

// export const MessageGroup = styled.View`
//   display: flex;
//   flex-direction: row;

//   align-items: center;

//   margin-bottom: 4px;
//   gap: 6px;
// `;

// export const MessageSystemContainer = styled.View`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   margin-bottom: 18px;
// `;

// export const MessageSystemContainerText = styled.Text`
//   color: ${palette.primaryB2};
// `;

// export const MessageBoxContainer = styled.View`
//   border-radius: 5px;
//   background-color: ${palette.buttonColor};

//   margin-right: 16px;
//   max-width: 90%;

//   position: relative;
// `;

// export const MessageBox = styled.Text`
//   color: ${palette.white};
//   padding: 6px 14px;
//   border-radius: 10px;
// `;

// export const InputSvgContainer = styled.TouchableOpacity`
//   position: absolute;
//   top: 10px;
//   right: 30px;
// `;

// export const MyMessageContainer = styled.View`
//   flex: 1;
//   display: flex;
//   justify-content: flex-end;
//   align-items: flex-end;
// `;

// export const MyMessageText = styled.Text`
//   border-width: 1px;
//   padding: 6px 14px;
//   border-radius: 5px;
// `;

// export const MessageDate = styled.Text`
//   margin-top: 2px;
// `;
