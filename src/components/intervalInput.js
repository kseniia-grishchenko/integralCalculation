import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const IntervalInput = ({route, navigation}) => {
  const [interval, setInterval] = useState({});
  const [stepsCount, setStepsCount] = useState(1);

  const onChangePoint = (point, value) => {
    const updatedInterval = {...interval};
    updatedInterval[point] = Number(value) || 0;

    setInterval(updatedInterval);
  };

  const onChangeStepsCount = value => {
    setStepsCount(Number(value) || 0);
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
        <Text>Start point</Text>
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
          maxLength={10}
        />
      </View>

      {interval && stepsCount && Object.keys(interval).length === 2 && (
        <Button
          title="Continue"
          onPress={() => {
            navigation.navigate('Choose calculation rule', {
              interval,
              stepsCount,
              ...route.params,
            });
          }}
        />
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
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    width: 40,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default IntervalInput;
