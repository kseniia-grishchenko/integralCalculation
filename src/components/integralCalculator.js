import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';
import {range} from 'mathjs';
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
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  useEffect(() => {
    const {functionChoice, interval, stepsCount, coefs} = route.params;

    const currentFunction = initFunction(functionChoice, coefs);
    setFunc(currentFunction);
    setResults([
      [
        'midpoint',
        ...currentFunction.calculateIntegral(
          new MidpointRule(interval, stepsCount),
        ),
      ],
      [
        'trapezoid',
        ...currentFunction.calculateIntegral(
          new TrapezoidRule(interval, stepsCount),
        ),
      ],
      [
        'simpson',
        ...currentFunction.calculateIntegral(
          new SimpsonRule(interval, stepsCount),
        ),
      ],
    ]);
  }, [route]);

  useEffect(() => {
    const interval = route.params.interval;
    if (func && interval) {
      const xVal = range(interval.start, interval.end + 0.5, 0.5).toArray();

      setXValues(xVal);
      setYValues(xVal.map(x => func.fX(x)));
    }
  }, [func, route]);

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
      {results && (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Rule</DataTable.Title>
            <DataTable.Title>Result</DataTable.Title>
            <DataTable.Title>Time of execution</DataTable.Title>
          </DataTable.Header>

          {results.map(result => (
            <DataTable.Row>
              {result.map(innerRes => (
                <DataTable.Cell>{innerRes}</DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable>
      )}
      <Text>
        {xValues.length && yValues.length && (
          <Plot xValues={xValues} yValues={yValues} />
        )}
      </Text>
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
