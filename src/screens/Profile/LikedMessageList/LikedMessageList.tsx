import React from 'react';

import {ProfileBottomLine, ProfileSafeAreaView} from '../Profile';
import moment from 'moment';
import 'moment/locale/ko';
import {FlatList} from 'react-native';
import ProfileLayout from 'components/ProfileLayout';
import {useLikedMessageList} from 'lib/query/profile';

export default function LikedMessageList() {
  const {likedListProfileData} = useLikedMessageList();

  const loadMoreData = () => {
    console.log('데이터 불러와');
  };

  return (
    <ProfileSafeAreaView>
      <FlatList
        initialNumToRender={10}
        keyExtractor={item => String(item.receiverId)}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        data={likedListProfileData}
        renderItem={({item}) => (
          <>
            <ProfileLayout
              uri={item?.profileImages.PreSignedUrl[0]}
              nickname={item?.receiverNickname}
              subText={`유효시간 : ${moment(item.expireMatch)
                .locale('ko')
                .format('MM월 DD일  HH시mm분')}`}
            />
            <ProfileBottomLine />
          </>
        )}
      />
    </ProfileSafeAreaView>
  );
}
