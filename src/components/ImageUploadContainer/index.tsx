import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React from 'react';
import {Asset} from 'react-native-image-picker';

type ImageUploadContainerType = {
  type: string;
  onUpload: (type: string, index: number) => void;
  initialImages: Array<Asset>;
};

export default function ImageUploadContainer(props: ImageUploadContainerType) {
  const {type = 'create', onUpload, initialImages} = props;

  return (
    <View style={styles.imageRow}>
      <FlatList
        horizontal
        data={initialImages}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => onUpload(type, index)}>
                <Image source={{uri: item?.uri}} style={styles.image} />
              </TouchableOpacity>
            </>
          );
        }}
        keyExtractor={(item, index) => String(`${item.fileName} + ${index}`)}
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
