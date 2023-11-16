import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React from 'react';
import {useImageStore} from 'store/signup/signUpStore';

type ImageUploadContainerType = {
  onUpload: (index: number) => void;
};

export default function ImageUploadContainer(props: ImageUploadContainerType) {
  const {onUpload} = props;

  const images = useImageStore(state => state.images);

  return (
    <View style={styles.imageRow}>
      <FlatList
        horizontal
        data={images}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => onUpload(index)}>
                <Image source={{uri: item?.uri}} style={styles.image} />
              </TouchableOpacity>
            </>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  plusIconContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    color: '#fff',
    fontSize: 40,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});