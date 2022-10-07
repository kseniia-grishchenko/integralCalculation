import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const coefs = {
  parabolic: ['a', 'b', 'c'],
  sinusoid: ['a', 'b', 'c', 'd'],
};

const CoefficientsInput = ({route, navigation}) => {
  const [enteredCoefs, setEnteredCoefs] = useState({});

  const {functionChoice} = route.params;
  const functionCoefs = coefs[functionChoice];

  const onChangeCoef = (coef, value) => {
    const updatedCoefs = {...enteredCoefs};
    updatedCoefs[coef] = Number(value) || 0;

    console.log(updatedCoefs);
    setEnteredCoefs(updatedCoefs);
  };

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
            maxLength={10}
          />
        </View>
      ))}
      {enteredCoefs &&
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
