import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';

export default function ImageUploadContainer() {
  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        {selectedImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() =>
              setSelectedImages(selectedImages.filter((_, i) => i !== index))
            }>
            <Image source={{uri: ''}} style={styles.image} />
          </TouchableOpacity>
        ))}
        {selectedImages.length < 5 && (
          <TouchableOpacity style={styles.imageContainer} onPress={() => {}}>
            <View style={styles.plusIconContainer}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Button title="Upload Images" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  plusIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  plusIcon: {
    fontSize: 40,
    color: '#888',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
