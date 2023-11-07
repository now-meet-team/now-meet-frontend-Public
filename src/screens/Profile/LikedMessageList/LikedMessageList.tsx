import React from 'react';
import {ProfileBottomLine, ProfileSafeAreaView} from '../Profile';
import ProfileLayout from 'components/ProfileLayout';
import {FlatList} from 'react-native';

export default function LikedMessageList() {
  const data = [
    {key: 'item1', nickname: '사용자1', subText: '필라테스 강사 29'},
    {key: 'item2', nickname: '사용자2', subText: '요가 강사 35'},
    {key: 'item3', nickname: '사용자3', subText: '테니스 코치 42'},
    {key: 'item4', nickname: '사용자4', subText: '스포츠 코디네이터 28'},
    {key: 'item5', nickname: '사용자5', subText: '피트니스 트레이너 31'},
    {key: 'item5', nickname: '사용자5', subText: '피트니스 트레이너 31'},
    {key: 'item5', nickname: '사용자5', subText: '피트니스 트레이너 31'},
    {key: 'item5', nickname: '사용자5', subText: '피트니스 트레이너 31'},
    {key: 'item5', nickname: '사용자5', subText: '피트니스 트레이너 31'},
    {key: 'item5', nickname: '사용자5', subText: '피트니스 트레이너 31'},
    {key: 'item5', nickname: '사용자5', subText: '피트니스 트레이너 31'},
  ];

  const loadMoreData = () => {
    console.log('데이터 불러와');
  };

  return (
    <ProfileSafeAreaView>
      <FlatList
        initialNumToRender={10}
        keyExtractor={(item, index) => index}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        data={data}
        renderItem={({item}) => (
          <>
            <ProfileLayout nickname={item.nickname} subText={item.subText} />
            <ProfileBottomLine />
          </>
        )}
      />
    </ProfileSafeAreaView>
  );
}
