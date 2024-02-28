import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ExitSVG} from 'assets';
import {useModalStore} from 'store/modal/modalStore';
import CustomModal, {modalStyle} from 'components/CustomModal';
import Button from 'components/Common/Button/Button';
import {palette} from 'config/globalStyles';
import {useChatDelete, useChatExit} from 'lib/mutation/chat';
import {ChatStatus} from 'types/chat';
import useSocket from 'hooks/useSocket';

type ChatRightExitType = {
  chatId: number;
  chatStatus: string;
};

export default function ChatRightExit(props: ChatRightExitType) {
  const {chatId, chatStatus} = props;

  const {useChatExitMutation} = useChatExit();
  const {useChatDeleteMutation} = useChatDelete();

  const {chatRoomStatus} = useSocket(chatId);

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
              chatRoomStatus === ChatStatus.SENDER_EXIT ||
              chatRoomStatus === ChatStatus.RECEIVER_EXIT
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
