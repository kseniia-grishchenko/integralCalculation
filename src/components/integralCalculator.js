import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
const {ParabolicFunction, SinusoidFunction} = require('../models/function.js');
const {
  MidpointRule,
  TrapezoidRule,
  SimpsonRule,
} = require('../models/integralRule.js');
import Plot from './plot.js';

const initFunction = (functionChoice, coefs) => {
  switch (functionChoice) {
    case 'parabolic':
      return new ParabolicFunction(coefs);
    case 'sinusoid':
      return new SinusoidFunction(coefs);
  }
};

const IntegralCalculator = ({route, navigation}) => {
  const [func, setFunc] = useState();
  const [results, setResults] = useState(null);
  useEffect(() => {
    const {functionChoice, interval, stepsCount, coefs} = route.params;

    const currentFunction = initFunction(functionChoice, coefs);
    setFunc(currentFunction);

    setResults([
      currentFunction.calculateIntegral(new MidpointRule(interval, stepsCount)),
      currentFunction.calculateIntegral(
        new TrapezoidRule(interval, stepsCount),
      ),
      currentFunction.calculateIntegral(new SimpsonRule(interval, stepsCount)),
    ]);
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
      {results?.length && (
        <>
          <Text>Integral value is: </Text>
          <Text>Midpoint rule: {results[0]}</Text>
          <Text>Trapezoid rule: {results[1]}</Text>
          <Text>Simpson rule: {results[2]}</Text>
        </>
      )}
      {/* <Plot interval={route.params.interval} func={func} /> */}
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
