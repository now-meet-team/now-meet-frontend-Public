import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ExitSVG} from 'assets';
import {useModalStore} from 'store/modal/modalStore';
import CustomModal, {modalStyle} from 'components/CustomModal';
import Button from 'components/Common/Button/Button';
import {palette} from 'config/globalStyles';
import {useChatDelete, useChatExit} from 'services/mutation/chat';
import {ChatStatus} from 'types/chat';
import useSocket from 'hooks/useSocket';
import {useChatRoom} from 'services/query/chat';

type ChatRightExitType = {
  chatId: number;
};

export default function ChatRightExit(props: ChatRightExitType) {
  const {chatId} = props;

  const {useChatExitMutation} = useChatExit();
  const {useChatDeleteMutation} = useChatDelete();

  const {chatRoomStatus} = useSocket(chatId);
  const {chatRoomData} = useChatRoom(chatId);

  return (
    <>
      <CustomModal title="채팅방을 나가시겠어요?">
        <View style={modalStyle.buttonContainer}>
          <Button
            style={[modalStyle.buttonStyle]}
            color={palette.primaryB1}
            backgroundColor={palette.primaryB3}
            title={'취소' || ''}
            onPress={() => useModalStore.setState({visible: false})}
          />
          <Button
            style={modalStyle.buttonStyle}
            backgroundColor={palette.primaryB1}
            title={'나가기' || ''}
            onPress={() => {
              [ChatStatus.SENDER_EXIT, ChatStatus.RECEIVER_EXIT].includes(
                chatRoomData?.chatUserData.chatStatus ?? '',
              ) ||
              [ChatStatus.SENDER_EXIT, ChatStatus.RECEIVER_EXIT].includes(
                chatRoomStatus,
              )
                ? useChatDeleteMutation.mutate(chatId)
                : useChatExitMutation.mutate(chatId);
            }}
          />
        </View>
      </CustomModal>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => useModalStore.setState({visible: true})}>
        <ExitSVG />
      </TouchableOpacity>
    </>
  );
}
