import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from 'components/Common/Button/Button';
import {palette} from 'config/globalStyles';

import {useModalStore} from 'store/modal/modalStore';

type CustomModalType = {
  title: string;
  leftButtonTitle?: string;
  rightButtonTitle?: string;
  onPress: () => void;
};

export default function CustomModal(props: CustomModalType) {
  const {title, leftButtonTitle, rightButtonTitle, onPress} = props;

  const visible = useModalStore(state => state.visible);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={modalStyle.modalContainer}>
        <View style={modalStyle.modalContent}>
          <Text style={modalStyle.modalText}>{title}</Text>

          <View style={modalStyle.buttonContainer}>
            <Button
              style={[modalStyle.buttonStyle, modalStyle.buttonLogout]}
              color={palette.awesome}
              title={leftButtonTitle || ''}
              onPress={onPress}
            />
            <Button
              style={modalStyle.buttonStyle}
              backgroundColor={palette.awesome}
              title={rightButtonTitle || ''}
              onPress={() => useModalStore.setState({visible: false})}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 260,
    height: 166,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 17,
    fontWeight: '400',
  },

  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    gap: 6,
  },

  buttonStyle: {
    width: 107,
    height: 38,
    borderRadius: 12,
  },

  buttonLogout: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.awesome,
  },
});
