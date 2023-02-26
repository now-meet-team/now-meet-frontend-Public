import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';

import DatePicker from 'react-native-date-picker';

export default function CustomDatePicker() {
  const [date, setDate] = useState(new Date());

  return (
    <Text>
      <DatePicker
        maximumDate={new Date('2023-12-31')}
        style={styles.StyledView}
        mode="date"
        date={date}
        onDateChange={setDate}
      />
      ;
    </Text>
  );
}

const styles = StyleSheet.create({
  StyledView: {
    width: Dimensions.get('screen').width,
  },
});
