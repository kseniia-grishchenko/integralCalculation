import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const integralRuleChoices = ['midpoint', 'trapezoid', 'simpson'];

const CalculationMethodCheckbox = ({route, navigation}) => {
  const [selected, setSelection] = useState();

  return (
    <View style={styles.container}>
      {integralRuleChoices.map(ruleChoice => (
        <View style={styles.checkboxContainer} key={ruleChoice}>
          <CheckBox
            value={selected === ruleChoice}
            onValueChange={value => setSelection(value ? ruleChoice : null)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{ruleChoice} rule</Text>
        </View>
      ))}
      {selected && (
        <Button
          title="Calculate integral"
          onPress={() => {
            navigation.navigate('Integral calculator', {
              ruleChoice: selected,
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    textTransform: 'capitalize',
  },
});

export default CalculationMethodCheckbox;
