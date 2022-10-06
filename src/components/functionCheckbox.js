import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const functionChoices = ['parabolic', 'sinusoid'];

const FunctionCheckbox = ({navigation}) => {
  const [selected, setSelection] = useState();

  return (
    <View style={styles.container}>
      {functionChoices.map(functionChoice => (
        <View style={styles.checkboxContainer} key={functionChoice}>
          <CheckBox
            value={selected === functionChoice}
            onValueChange={value => setSelection(value ? functionChoice : null)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{functionChoice}</Text>
        </View>
      ))}
      {selected && (
        <Button
          title="Continue"
          onPress={() => {
            navigation.navigate('Coefficients input', {
              functionChoice: selected,
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default FunctionCheckbox;
