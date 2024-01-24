import {StyleSheet, View, Image} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';

import GoogleMap from 'components/GoogleMap/GoogleMap';
import BottomSheet, {BottomSheetVirtualizedList} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

import {useNavigation} from '@react-navigation/native';
import {useLocationProfile} from 'lib/query/googlemap';
import {NearbyUsersType} from 'types/googlemap';
import {palette} from 'config/globalStyles';
import {calculateAge} from 'utils/calculateAge';
import {LeftArrowSVG, ProfileSVG, MessageSVG} from '../../assets';

import {RootStackNavigationProp} from 'navigation/Routes';

export default function Main() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const sheetRef = useRef<BottomSheet>(null);

  const {locationProfileData} = useLocationProfile();

  const snapPoints = useMemo(() => ['15%', '50%'], []);

  return (
    <MainContainer>
      <MainWrapper
        right={'3%'}
        onPress={() => navigation.navigate('Profile' as never)}>
        <ProfileSVG />
      </MainWrapper>
      <MainWrapper
        right={'16%'}
        onPress={() => navigation.navigate('MessageRoom' as never)}>
        <MessageSVG />
      </MainWrapper>

      <GoogleMap locationProfileData={locationProfileData || undefined} />
      <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
        <BottomSheetVirtualizedList
          data={locationProfileData?.nearbyUsers || []}
          keyExtractor={item => item.nickname}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          renderItem={useCallback(
            ({item}: {item: NearbyUsersType}) => (
              <View style={styles.itemContainer}>
                <MainDetailFlexList
                  onPress={() =>
                    navigation.navigate('UserDetail', {
                      nickname: item.nickname,
                    })
                  }>
                  <Image
                    style={styles.images}
                    source={{
                      uri: item.PreSignedUrl[0],
                    }}
                  />
                  <View>
                    <ListNickName>{item.nickname}</ListNickName>
                    <ListUserInfo>
                      {item.sex === 'men' ? '남성' : '여성'} ·{' '}
                      {`${calculateAge(item.birthDate)}살`} · {item.job}
                    </ListUserInfo>
                  </View>
                </MainDetailFlexList>

                <LeftArrowSVG />
              </View>
            ),
            [navigation],
          )}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,

    bottom: 0,

    position: 'absolute',

    backgroundColor: 'red',

    height: 50,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    margin: 6,
  },
  images: {
    width: 70,
    height: 70,
    marginRight: 20,
    borderRadius: 50,
  },
});

export const MainWrapper = styled.TouchableOpacity<{right: string}>`
  position: absolute;
  top: 80px;
  right: ${props => props.right || '3%'};

  z-index: 2;
`;

export const MainDetailFlexList = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MainContainer = styled.SafeAreaView`
  position: relative;
`;

export const ListNickName = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

export const ListUserInfo = styled.Text`
  color: ${palette.gray};
`;
