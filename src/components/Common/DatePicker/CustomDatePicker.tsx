import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';

import DatePicker from 'react-native-date-picker';

export default function CustomDatePicker() {
  const [date, setDate] = useState(new Date());

  const adultYear = date.getFullYear() - 20;
  const maximumDate = new Date(adultYear + 1, 11, 31);

  return (
    <Text>
      <DatePicker
        style={styles.StyledView}
        mode="date"
        date={date}
        onDateChange={() => setDate(date)}
        maximumDate={maximumDate}
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
