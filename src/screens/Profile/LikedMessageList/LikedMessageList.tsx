import React from 'react';

import {ProfileBottomLine, ProfileSafeAreaView} from '../Profile';
import moment from 'moment';
import 'moment/locale/ko';
import {FlatList, View} from 'react-native';
import ProfileLayout from 'components/ProfileLayout';
import {useLikedMessageList} from 'lib/query/profile';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackNavigationProp} from 'navigation/Routes';
import {useNavigation} from '@react-navigation/native';
import {calculateRemainingTime} from 'utils/like';
import {matchStatus} from 'utils/status';

export default function LikedMessageList() {
  const {likedListProfileData} = useLikedMessageList();

  const navigation = useNavigation<RootStackNavigationProp>();

  const loadMoreData = () => {
    console.log('데이터 불러와');
  };

  console.log(likedListProfileData);
  return (
    <ProfileSafeAreaView>
      {!likedListProfileData ? (
        <EmptyView>
          <EmptyTitle>전송한 메세지가 없습니다.</EmptyTitle>
          <EmptyInfo>대화를 하고 싶은 사람에게 메세지를 보내세요.</EmptyInfo>
        </EmptyView>
      ) : (
        <FlatList
          initialNumToRender={10}
          keyExtractor={item => String(item.receiverId)}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          data={likedListProfileData}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserDetail', {
                  nickname: item?.receiverNickname,
                });
              }}>
              <LikedContainer>
                <ProfileLayout
                  uri={item?.profileImages.PreSignedUrl[0]}
                  nickname={item?.receiverNickname}
                  subText={`수락까지 남은 시간 : ${
                    calculateRemainingTime(item.expireMatch).hours
                  }시 ${calculateRemainingTime(item.expireMatch).minute}분`}
                />

                <EmptyText>{matchStatus[item.matchStatus]}</EmptyText>
              </LikedContainer>
            </TouchableOpacity>
          )}
        />
      )}
    </ProfileSafeAreaView>
  );
}

const EmptyView = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LikedContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`;

const EmptyTitle = styled.Text`
  font-size: 24px;
`;

const EmptyText = styled.Text`
  font-size: 15px;
  color: ${palette.gray};
`;

const EmptyInfo = styled.Text`
  font-size: 16px;
  color: ${palette.gray};
  margin-top: 8px;
`;
