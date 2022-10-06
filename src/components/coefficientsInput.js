import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const coefs = {
  parabolic: ['a', 'b', 'c'],
  sinusoid: ['a', 'b', 'c', 'd'],
};

const CoefficientsInput = ({route, navigation}) => {
  const [enteredCoefs, setEnteredCoefs] = useState({});

  const {functionChoice} = route.params;
  const funcionCoefs = coefs[functionChoice];

  const onChangeCoef = (coef, value) => {
    const updatedCoefs = {...enteredCoefs};
    updatedCoefs[coef] = value;

    console.log(updatedCoefs);
    setEnteredCoefs(updatedCoefs);
  };

  return (
    <View style={styles.container}>
      <Text>Enter coefficients for {functionChoice} function</Text>

      {funcionCoefs.map(coef => (
        <View style={styles.coef} key={coef}>
          <Text>{coef}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={value => onChangeCoef(coef, value)}
            defaultValue={0}
          />
        </View>
      ))}
      <Button
        title="Calculate Integral"
        onPress={() => {
          navigation.navigate('Calculate integral', {coefs: enteredCoefs});
        }}
      />
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

export default CoefficientsInput;
