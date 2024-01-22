import React from 'react';
import {ProfileSafeAreaView} from '../Profile';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';
import Button from 'components/Common/Button/Button';
import {ButtonContainer} from 'layout/SignUpLayout/SignUpLayout';
import CustomModal, {modalStyle} from 'components/CustomModal';
import {useModalStore} from 'store/modal/modalStore';
import {usePostUserDelete} from 'lib/mutation/auth';
import {View} from 'react-native';

export default function UserDelete() {
  const handleVisible = useModalStore(state => state.handleVisible);
  const {useUserDeleteMutation} = usePostUserDelete();

  return (
    <ProfileSafeAreaView>
      <CustomModal title="정말 계정을 삭제하시겠어요?">
        <View style={modalStyle.buttonContainer}>
          <Button
            style={[modalStyle.buttonStyle, modalStyle.buttonLogout]}
            color={palette.awesome}
            title={'계정삭제' || ''}
            onPress={() => useUserDeleteMutation.mutate()}
          />
          <Button
            style={modalStyle.buttonStyle}
            backgroundColor={palette.awesome}
            title={'취소' || ''}
            onPress={() => useModalStore.setState({visible: false})}
          />
        </View>
      </CustomModal>

      <UserDeleteInfoText>
        계정을 삭제하면 잔여 보석을 포함한 모든 데이터가 삭제되고 복구가
        불가능합니다. {'\n'}재가입 시 환불되지 않으며, 계정 정보도 복구
        불가능합니다.
      </UserDeleteInfoText>

      <ButtonContainer>
        <Button
          style={{
            marginLeft: 15,
            marginRight: 15,
            borderWidth: 1,
            borderColor: palette.awesome,
          }}
          color={palette.awesome}
          backgroundColor={palette.white}
          padding={'12px 24px'}
          title={'계정 삭제'}
          onPress={() => handleVisible(true)}
        />
      </ButtonContainer>
    </ProfileSafeAreaView>
  );
}

export const UserDeleteInfoText = styled.Text`
  font-size: 14px;
  line-height: 24px;
  padding: 24px 12px;
`;
