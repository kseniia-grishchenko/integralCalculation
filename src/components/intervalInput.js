import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const IntervalInput = ({route, navigation}) => {
  const [interval, setInterval] = useState({});
  const [stepsCount, setStepsCount] = useState(1);
  const [errors, setErrors] = useState({});

  const onChangePoint = (point, value) => {
    if (isNaN(value)) {
      setErrors({
        ...errors,
        intervalError: 'Value should be numeric!',
      });
      return;
    }

    const updatedInterval = {...interval};
    updatedInterval[point] = Number(value) || 0;

    console.log(updatedInterval);

    if (
      updatedInterval.start &&
      updatedInterval.end &&
      updatedInterval.start > updatedInterval.end
    ) {
      setErrors({
        ...errors,
        intervalError: 'Incorrect inteval. Start value should be less than end',
      });
      return;
    }

    if (errors.intervalError) {
      setErrors({
        ...errors,
        intervalError: '',
      });
    }
    setInterval(updatedInterval);
  };

  const onChangeStepsCount = value => {
    if (isNaN(value)) {
      setErrors({
        ...errors,
        subintervalAmountError: 'Value should be numeric!',
      });
      return;
    }
    if (value < 1) {
      setErrors({
        ...errors,
        subintervalAmountError: 'Minimum interval amount is 1!',
      });
      return;
    }
    if (errors.subintervalAmountError) {
      setErrors({
        ...errors,
        subintervalAmountError: '',
      });
    }

    setStepsCount(Number(value) || 1);
  };

  return (
    <View style={styles.container}>
      <Text>
        Enter interval and amount of subintervals for integral calculation
      </Text>

      <View style={styles.coef} key="start">
        <Text>Start point</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => onChangePoint('start', value)}
          value={interval.start}
          maxLength={10}
        />
      </View>

      <View style={styles.coef} key="end">
        <Text>End point</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => onChangePoint('end', value)}
          value={interval.end}
          maxLength={10}
        />
      </View>

      <View style={styles.coef} key="subinterval">
        <Text>Amount of subintervals</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => onChangeStepsCount(value)}
          value={stepsCount}
          maxLength={5}
        />
      </View>

      {!Object.values(errors).some(err => err) &&
        interval &&
        stepsCount &&
        Object.keys(interval).length === 2 && (
          <Button
            title="Continue"
            onPress={() => {
              navigation.navigate('Integral calculator', {
                interval,
                stepsCount,
                ...route.params,
              });
            }}
          />
        )}
      {Object.values(errors).some(err => err) && (
        <Text>{errors.intervalError || errors.subintervalAmountError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coef: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  input: {
    width: 70,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default IntervalInput;
