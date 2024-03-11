import {TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {ChatStatus, ResponseMessageType} from 'types/chat';
import ProfileImage from 'components/ProfileImage';
import {formatTimeToAMPM} from 'utils/time';
import {palette} from 'config/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'navigation/Routes';
import {DefaultProfile} from 'assets';

type MessageListType = {
  item: ResponseMessageType;
  chatUserNickname: string;
  chatProfileUrl: string;
  status: string;
};

function MessageList(props: MessageListType) {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {item, chatUserNickname, chatProfileUrl, status} = props;

  return (
    <>
      <MessageGroup>
        {item.content !== undefined && item.type === 'system' ? (
          <MessageSystemContainer>
            <MessageSystemContainerText>
              {item?.content}
            </MessageSystemContainerText>
          </MessageSystemContainer>
        ) : chatUserNickname === item.senderNickname ? (
          <>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (
                  status !== ChatStatus.RECEIVER_EXIT &&
                  status !== ChatStatus.SENDER_EXIT &&
                  status !== ChatStatus.DISCONNECT_END
                ) {
                  navigation.navigate('UserDetail', {
                    nickname: chatUserNickname,
                  });
                }
              }}>
              {status !== ChatStatus.RECEIVER_EXIT &&
              status !== ChatStatus.SENDER_EXIT &&
              status !== ChatStatus.DISCONNECT_END ? (
                <ProfileImage width={30} height={30} uri={chatProfileUrl} />
              ) : (
                <DefaultProfile />
              )}
            </TouchableOpacity>

            <MessageBoxContainer>
              {item?.content !== undefined && (
                <>
                  <MessageBoxWrapper>
                    <MessageBox>{item?.content}</MessageBox>
                  </MessageBoxWrapper>

                  <MessageDate>{formatTimeToAMPM(item.createdAt)}</MessageDate>
                </>
              )}
            </MessageBoxContainer>
          </>
        ) : (
          <MyMessageContainer>
            {item?.content !== undefined && (
              <>
                <MyMessageText>{item?.content}</MyMessageText>
                <MessageDate>
                  {formatTimeToAMPM(item.createdAt ?? '')}
                </MessageDate>
              </>
            )}
          </MyMessageContainer>
        )}
      </MessageGroup>
    </>
  );
}

export default React.memo(MessageList);

export const MessageGroup = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;

  margin-bottom: 4px;
  gap: 6px;
`;

export const MessageSystemContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 18px;
`;

export const MessageSystemContainerText = styled.Text`
  color: ${palette.primaryB2};
`;

export const MessageBoxContainer = styled.View`
  max-width: 90%;
  margin-right: 16px;
  margin-top: 16px;
`;

export const MessageBoxWrapper = styled.View`
  background-color: ${palette.buttonColor};
  border-radius: 5px;

  display: flex;

  justify-content: center;
  align-items: center;
`;

export const MessageBox = styled.Text`
  color: ${palette.white};
  padding: 6px 14px;
`;

export const InputSvgContainer = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 30px;
`;

export const ChatContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ChatWrapper = styled.View`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

export const MyMessageContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const MyMessageText = styled.Text`
  border-width: 1px;
  padding: 6px 14px;
  border-radius: 5px;
`;

export const MessageDate = styled.Text`
  margin-top: 2px;
`;
