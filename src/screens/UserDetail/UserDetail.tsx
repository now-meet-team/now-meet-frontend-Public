import {View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/Routes';
import {ProfileBottomLine, ProfileSafeAreaView} from 'screens/Profile/Profile';
import styled from 'styled-components/native';
import UserChip from 'components/UserChip';
import {LoveSVG} from '../../assets';
import CustomModal, {modalStyle} from 'components/CustomModal';
import Button from 'components/Common/Button/Button';
import {palette} from 'config/globalStyles';
import {useModalStore} from 'store/modal/modalStore';
import {useProfileLike} from 'lib/mutation/profile/like';

import {useUserDetail} from 'lib/query/user';
import {calculateAge} from 'utils/calculateAge';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

export default function UserDetail() {
  const {params} = useRoute<DetailScreenRouteProp>();

  const {useUserLikeMutation} = useProfileLike();

  const likeModalVisible = useModalStore(state => state.likeModalVisible);
  const handleSetTimeoutVisible = useModalStore(
    state => state.handleSetTimeoutVisible,
  );

  const {useUserDetailData} = useUserDetail(params?.nickname);

  console.log(useUserDetailData?.matchStatus !== null);

  return (
    <ProfileSafeAreaView>
      <ProfileUserDetailContainer>
        {likeModalVisible ? (
          <CustomModal title={''}>
            <LikeModalContainer>
              <LoveSVG
                color={'#262626'}
                width={40}
                height={35}
                style={{marginBottom: 20}}
              />
              <LikeTitle>좋아요 전송 완료!</LikeTitle>
              <LikeInfoText numberOfLines={1}>
                24시간 뒤에 좋아요를 다시 보낼 수 있어요.
              </LikeInfoText>
            </LikeModalContainer>
          </CustomModal>
        ) : (
          <CustomModal title={'좋아요를 보내서\n대화를 시작해보세요!'}>
            <View style={modalStyle.buttonContainer}>
              <Button
                style={[modalStyle.buttonStyle, modalStyle.b1ButtonStyle]}
                color={palette.white}
                title={'잼50개' || ''}
                fontSize={13}
                onPress={() => {
                  useModalStore.setState({likeModalVisible: true});
                  useUserLikeMutation.mutate(params.nickname);
                  handleSetTimeoutVisible();
                }}
              />
              <Button
                style={modalStyle.buttonStyle}
                color={palette.primaryB1}
                backgroundColor={palette.primaryB3}
                title={'취소' || ''}
                fontSize={13}
                onPress={() => useModalStore.setState({visible: false})}
              />
            </View>
          </CustomModal>
        )}

        <ProfileUserDetailWrapper>
          <ProfileUserDetailImage
            source={{uri: useUserDetailData?.PreSignedUrl[0]}}
            alt="userMainImage"
          />

          <View
            style={{
              height: 138,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View>
              <ProfileUserDetailName>
                {useUserDetailData?.user.nickname || ''}
              </ProfileUserDetailName>

              <ProfileUserDetailInfo>
                {useUserDetailData?.user.sex === 'men' ? '남성' : '여성'} ·{' '}
                {`${calculateAge(useUserDetailData?.user.birthDate || '')}살`} ·{' '}
                {useUserDetailData?.user.job}
              </ProfileUserDetailInfo>
            </View>

            <UserChip
              width={'158'}
              height={'40'}
              style={
                useUserDetailData?.matchStatus === null
                  ? {}
                  : {
                      borderWidth: 0,
                      backgroundColor: palette.primaryB3,
                      color: palette.primaryB2,
                    }
              }
              disabled={useUserDetailData?.matchStatus !== null}
              onPress={() => useModalStore.setState({visible: true})}
              text="좋아요 보내기"
              svg={
                <LoveSVG
                  color={
                    useUserDetailData?.matchStatus === null
                      ? '#262626'
                      : palette.primaryB2
                  }
                />
              }
            />
          </View>
        </ProfileUserDetailWrapper>

        <UserDetailIntroduceContainer>
          <UserDetailIntroduceTitle>자기소개</UserDetailIntroduceTitle>

          <UserDetailIntroduceIntroduce>
            {useUserDetailData?.user.introduce}
          </UserDetailIntroduceIntroduce>
        </UserDetailIntroduceContainer>

        <ProfileBottomLine />

        <UserDetailIntroduceContainer>
          <UserDetailIntroduceTitle>취향</UserDetailIntroduceTitle>
          <UserChipContainer>
            {useUserDetailData?.user.preference?.map(item => {
              return (
                <UserChip
                  key={item}
                  disabled
                  width={'100'}
                  height={'36'}
                  onPress={() => {}}
                  text={item}
                />
              );
            })}
          </UserChipContainer>
        </UserDetailIntroduceContainer>

        <ProfileBottomLine />

        <ProfileUserDetailMiniContainer>
          {useUserDetailData?.PreSignedUrl?.map((item, index) => {
            return (
              <ProfileUserDetailMiniImage
                key={item}
                source={{uri: item}}
                alt={`miniImage${index}`}
              />
            );
          })}
        </ProfileUserDetailMiniContainer>
      </ProfileUserDetailContainer>
    </ProfileSafeAreaView>
  );
}

export const ProfileUserDetailContainer = styled.View`
  padding: 27px 27px;
`;

export const ProfileUserDetailWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const UserDetailIntroduceContainer = styled.View`
  margin-bottom: 32px;
`;

export const UserDetailIntroduceTitle = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
`;

export const UserDetailIntroduceIntroduce = styled.Text`
  margin-top: 12px;
`;

export const ProfileUserDetailImage = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 8px;
`;

export const ProfileUserDetailMiniContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 21px;
`;

export const ProfileUserDetailMiniImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

export const ProfileUserDetailName = styled.Text`
  font-size: 20px;
  margin-bottom: 2px;
  font-weight: 600;
`;

export const ProfileUserDetailInfo = styled.Text`
  color: #9e9999;
  font-size: 12px;
`;

export const UserChipContainer = styled.View`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

export const LikeModalContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LikeTitle = styled.Text`
  font-size: 22px;
  font-weight: 500;
`;

export const LikeInfoText = styled.Text`
  font-size: 12px;
  color: ${palette.primaryB2};
`;
