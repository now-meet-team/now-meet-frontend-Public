import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';

import GoogleMap from 'components/GoogleMap/GoogleMap';
import BottomSheet, {BottomSheetVirtualizedList} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

import {useNavigation} from '@react-navigation/native';
import {useLocationProfile} from 'lib/query/googlemap';
import {NearbyUsersType} from 'types/googlemap';

export default function Main() {
  const navigation = useNavigation();
  const sheetRef = useRef<BottomSheet>(null);

  const {locationProfileData} = useLocationProfile();

  const snapPoints = useMemo(() => ['15%', '50%'], []);

  return (
    <MainContainer>
      <MainWrapper onPress={() => navigation.navigate('Profile' as never)}>
        <Text>프로필</Text>
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
                <Image
                  style={styles.images}
                  source={{
                    uri: item.PreSignedUrl[0],
                  }}
                />
                <View>
                  <Text>{item.nickname}</Text>
                  <Text>{item.job}</Text>
                </View>
              </View>
            ),
            [],
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
    padding: 6,
    margin: 6,
  },
  images: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
});

export const MainContainer = styled.SafeAreaView`
  position: relative;
`;

export const MainWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 120px;
  left: 80%;
  right: 0px;

  z-index: 2;
`;
