import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from 'components/Common/Button/Button';
import {palette} from 'config/globalStyles';

import {useModalStore} from 'store/modal/modalStore';

type CustomModalType = {
  title: string;
  children: React.ReactNode;
};

export default function CustomModal(props: CustomModalType) {
  const {title, children} = props;

  const visible = useModalStore(state => state.visible);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={modalStyle.modalContainer}>
        <View style={modalStyle.modalContent}>
          <Text style={modalStyle.modalText}>{title}</Text>
          {children}
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

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },

  buttonContainer: {
    marginTop: 32,
    flexDirection: 'row',
    gap: 6,
  },

  buttonStyle: {
    width: 100,
    height: 40,
    borderRadius: 8,
  },

  buttonLogout: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.awesome,
  },

  b1ButtonStyle: {
    backgroundColor: palette.primaryB1,
    borderWidth: 1,
  },
});
