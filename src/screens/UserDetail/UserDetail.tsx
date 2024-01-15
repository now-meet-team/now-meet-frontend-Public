import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/Routes';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

export default function UserDetail() {
  const {params} = useRoute<DetailScreenRouteProp>();

  console.log(params.nickname);
  return (
    <View>
      <Text>{params.nickname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
