import React from 'react';

import {ProfileBottomLine, ProfileSafeAreaView} from '../Profile';
import moment from 'moment';
import 'moment/locale/ko';
import {FlatList} from 'react-native';
import ProfileLayout from 'components/ProfileLayout';
import {useLikedMessageList} from 'lib/query/profile';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackNavigationProp} from 'navigation/Routes';
import {useNavigation} from '@react-navigation/native';

export default function LikedMessageList() {
  const {likedListProfileData} = useLikedMessageList();

  const navigation = useNavigation<RootStackNavigationProp>();

  const loadMoreData = () => {
    console.log('데이터 불러와');
  };

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
              <ProfileLayout
                uri={item?.profileImages.PreSignedUrl[0]}
                nickname={item?.receiverNickname}
                subText={`유효시간 : ${moment(item.expireMatch)
                  .locale('ko')
                  .format('MM월 DD일  HH시mm분')}`}
              />
              <ProfileBottomLine />
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

const EmptyTitle = styled.Text`
  font-size: 24px;
`;

const EmptyInfo = styled.Text`
  font-size: 16px;
  color: ${palette.gray};
  margin-top: 8px;
`;
