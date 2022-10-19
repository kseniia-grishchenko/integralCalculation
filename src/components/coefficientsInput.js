import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const coefs = {
  parabolic: ['a', 'b', 'c'],
  sinusoid: ['a', 'b', 'c', 'd'],
};

const CoefficientsInput = ({route, navigation}) => {
  const [enteredCoefs, setEnteredCoefs] = useState({});
  const [error, setError] = useState('');

  const {functionChoice} = route.params;
  const functionCoefs = coefs[functionChoice];

  const onChangeCoef = (coef, value) => {
    const updatedCoefs = {...enteredCoefs};
    if (isNaN(value)) {
      setError('Value should be numeric');
      return;
    }
    updatedCoefs[coef] = Number(value);

    setEnteredCoefs(updatedCoefs);
  };

  useEffect(() => {
    if (
      Object.keys(enteredCoefs).length === functionCoefs.length &&
      Object.values(enteredCoefs).every(v => v === 0)
    ) {
      setError('All coefficients cannot be null! Please change the input');
    } else {
      setError('');
    }
  }, [enteredCoefs, functionCoefs]);

  return (
    <View style={styles.container}>
      <Text>Enter coefficients for {functionChoice} function</Text>

      {functionCoefs.map(coef => (
        <View style={styles.coef} key={coef}>
          <Text>{coef}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={value => onChangeCoef(coef, value)}
            defaultValue={0}
            value={enteredCoefs[coef]}
            maxLength={5}
          />
        </View>
      ))}
      {!error &&
        enteredCoefs &&
        Object.keys(enteredCoefs).length === functionCoefs.length && (
          <Button
            title="Continue"
            onPress={() => {
              navigation.navigate('Interval input', {
                coefs: enteredCoefs,
                functionChoice,
              });
            }}
          />
        )}
      {error && <Text>{error}</Text>}
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
    width: 70,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default CoefficientsInput;
