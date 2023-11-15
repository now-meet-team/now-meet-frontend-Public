import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {useBirthDateStore} from 'store/signup/signUpStore';

export default function CustomDatePicker() {
  // const [date, setDate] = useState(new Date());

  const date = useBirthDateStore(state => state.birthDate);
  const handleBirthDate = useBirthDateStore(state => state.handleBirthDate);

  const adultYear = new Date(date).getFullYear() - 20;
  const maximumDate = new Date(adultYear + 1, 11, 31);

  return (
    <Text>
      <DatePicker
        style={styles.StyledView}
        mode="date"
        date={new Date(date)}
        onDateChange={() => handleBirthDate(date)}
        maximumDate={maximumDate}
      />
    </Text>
  );
}

const styles = StyleSheet.create({
  StyledView: {
    width: Dimensions.get('screen').width,
  },
});
