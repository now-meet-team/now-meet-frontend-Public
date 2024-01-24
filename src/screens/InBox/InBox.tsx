import {FlatList, View, Text, StyleSheet, VirtualizedList} from 'react-native';
import React, {useCallback} from 'react';
import {ProfileSafeAreaView} from 'screens/Profile/Profile';
import styled from 'styled-components/native';
import {useInBoxList} from 'lib/query/like';
import {
  MessageUserInfo,
  LastMessage,
  MessageUserImage,
} from 'screens/MessageRoom/MessageRoom';
import {ProfileUserDetailName} from 'screens/UserDetail/UserDetail';
import {palette} from 'config/globalStyles';
import Button from 'components/Common/Button/Button';
import {calculateRemainingTime} from 'utils/like';
import {InboxListType} from 'types/list';
import {useUserAccept, useUserReject} from 'lib/mutation/like';

export default function InBox() {
  const {inboxListData} = useInBoxList();
  const {useUserAcceptMutation} = useUserAccept();
  const {useUserRejectMutation} = useUserReject();

  const renderItem = useCallback(
    ({item}: {item: InboxListType}) => (
      <InBoxFlatListContainer>
        <InBoxUserContainer>
          <MessageUserImage
            source={{uri: item?.profileImages.PreSignedUrl[0]}}
            alt="userMainImage"
          />

          <View>
            <InBoxTimeText>{`요청 대기시간 ${
              calculateRemainingTime(item?.expireMatch).hours
            }H`}</InBoxTimeText>

            <InBoxNickNameText numberOfLines={1}>
              {item.senderNickname}
            </InBoxNickNameText>
          </View>
        </InBoxUserContainer>

        <InBoxButtonContainer>
          <Button
            backgroundColor={palette.redText}
            style={styles.successButton}
            color={palette.white}
            title={'수락' || ''}
            fontSize={15}
            onPress={() => {
              console.log(item.matchId);
              useUserAcceptMutation.mutate(item.matchId);
            }}
          />

          <Button
            backgroundColor={palette.white}
            style={styles.failButton}
            color={palette.primaryB1}
            title={'거절' || ''}
            fontSize={15}
            onPress={() => {
              useUserRejectMutation.mutate(item.matchId);
            }}
          />
        </InBoxButtonContainer>
      </InBoxFlatListContainer>
    ),
    [useUserAcceptMutation, useUserRejectMutation],
  );

  return (
    <ProfileSafeAreaView>
      {inboxListData === null ? (
        <InBoxContainer>
          <Text>좋아요 요청이 없습니다.</Text>
        </InBoxContainer>
      ) : (
        <FlatList
          updateCellsBatchingPeriod={30}
          initialNumToRender={7}
          scrollEnabled={true}
          data={inboxListData}
          windowSize={11}
          renderItem={renderItem}
          keyExtractor={item => String(` ${item.matchId}`)}
        />
      )}
    </ProfileSafeAreaView>
  );
}

const styles = StyleSheet.create({
  successButton: {
    width: 66,
    height: 38,
    borderRadius: 5,
  },
  failButton: {
    width: 52,
    height: 38,
    borderRadius: 5,
    borderWidth: 1,
  },
});

export const InBoxContainer = styled.View`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InBoxUserContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
`;

export const InBoxFlatListContainer = styled(MessageUserInfo)`
  display: flex;
`;

export const InBoxButtonContainer = styled.View`
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 22px;

  gap: 4px;
`;

export const InBoxTimeText = styled(ProfileUserDetailName)`
  font-size: 15px;
  color: ${palette.primaryB2};
`;

export const InBoxNickNameText = styled(LastMessage)`
  font-size: 16px;
  color: ${palette.primaryB1};
  font-weight: 600;
`;
