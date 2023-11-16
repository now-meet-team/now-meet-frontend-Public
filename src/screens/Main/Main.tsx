import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';

import GoogleMap from 'components/GoogleMap/GoogleMap';
import BottomSheet, {BottomSheetVirtualizedList} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

import {useNavigation} from '@react-navigation/native';
import {useLocationProfile} from 'lib/query/googlemap';

export default function Main() {
  const navigation = useNavigation();
  const sheetRef = useRef<BottomSheet>(null);

  const {locationProfileData} = useLocationProfile();

  console.log(locationProfileData);

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );

  const snapPoints = useMemo(() => ['15%', '50%'], []);

  return (
    <MainContainer>
      <MainWrapper onPress={() => navigation.navigate('Profile' as never)}>
        <Text>프로필</Text>
      </MainWrapper>

      <GoogleMap locationProfileData={locationProfileData || undefined} />

      <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
        <BottomSheetVirtualizedList
          data={data}
          keyExtractor={i => i}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          renderItem={useCallback(
            ({item}: {item: any}) => (
              <View style={styles.itemContainer}>
                <Text>{item}</Text>
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
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
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
