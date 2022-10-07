import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
const {ParabolicFunction, SinusoidFunction} = require('../models/function.js');
const {
  MidpointRule,
  TrapezoidRule,
  SimpsonRule,
} = require('../models/integralRule.js');

const initIntegralRule = (choice, interval, stepsCount) => {
  switch (choice) {
    case 'midpoint':
      return new MidpointRule(interval, stepsCount);
    case 'trapezoid':
      return new TrapezoidRule(interval, stepsCount);
    case 'simpson':
      return new SimpsonRule(interval, stepsCount);
  }
};

const initFunction = (functionChoice, coefs) => {
  switch (functionChoice) {
    case 'parabolic':
      return new ParabolicFunction(coefs);
    case 'sinusoid':
      return new SinusoidFunction(coefs);
  }
};

const IntegralCalculator = ({route, navigation}) => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    const {functionChoice, ruleChoice, interval, stepsCount, coefs} =
      route.params;

    const integralRule = initIntegralRule(ruleChoice, interval, stepsCount);

    const currentFunction = initFunction(functionChoice, coefs);

    currentFunction.chooseIntegralRule(integralRule);

    setResult(currentFunction.calculateIntegral());
  }, [route]);

  return (
    <View style={styles.container}>
      <Text>Your function is: </Text>
      {route.params.functionChoice === 'parabolic' ? (
        <Text>
          {route.params.coefs.a}*x^2 + {route.params.coefs.b}*x +
          {route.params.coefs.c}
        </Text>
      ) : (
        <Text>
          {route.params.coefs.a}*sin({route.params.coefs.b}*x +
          {route.params.coefs.c}) + d
        </Text>
      )}
      <Text>
        Interval: [{route.params.interval.start}, {route.params.interval.end}]
      </Text>

      <Text>Steps count: {route.params.stepsCount}</Text>
      {result && (
        <>
          <Text>Integral value is: </Text>
          <Text>{result}</Text>
        </>
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
});

export default IntegralCalculator;
