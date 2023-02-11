import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {palette} from '../../config/globalStyles';
import Button from '../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';

export default function SignUp() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>SignUp</Text>
      <Button
        backgroundColor={palette.awesome}
        title="다음"
        onPress={() => navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
});
