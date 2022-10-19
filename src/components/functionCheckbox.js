import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const functionChoices = ['parabolic', 'sinusoid'];

const FunctionCheckbox = ({navigation}) => {
  const [selected, setSelection] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose function type</Text>
      {functionChoices.map(functionChoice => (
        <View style={styles.checkboxContainer} key={functionChoice}>
          <CheckBox
            boxType="square"
            onFillColor="#3CA1FF"
            onCheckColor="#fff"
            onTintColor="#3CA1FF"
            animationDuration="0,2"
            value={selected === functionChoice}
            onValueChange={value => setSelection(value ? functionChoice : null)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{functionChoice}</Text>
        </View>
      ))}
      {selected && (
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            navigation.navigate('Coefficients input', {
              functionChoice: selected,
            });
          }}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 12,
  },
  label: {
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: '#646464',
  },
  title: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 40,
  },
  btnContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#3CA1FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginTop: 40,
  },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    fontSize: 18,
  },
});

export default FunctionCheckbox;
