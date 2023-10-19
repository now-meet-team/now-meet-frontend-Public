import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';

import GoogleMap from 'components/GoogleMap/GoogleMap';
import BottomSheet, {BottomSheetVirtualizedList} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

export default function Main() {
  // const navigation = useNavigation();
  // const netInfo = useNetInfo();

  const sheetRef = useRef<BottomSheet>(null);

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );

  return (
    <MainContainer>
      <GoogleMap />

      <View style={styles.container}>
        <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
          <BottomSheetVirtualizedList
            data={data}
            keyExtractor={i => i}
            getItemCount={data => data.length}
            getItem={(data, index) => data[index]}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        </BottomSheet>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 200,
    position: 'absolute',
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
  flex: 1;
`;
