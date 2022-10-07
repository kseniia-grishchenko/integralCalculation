import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FunctionCheckbox from './src/components/functionCheckbox.js';
import CoefficientsInput from './src/components/coefficientsInput.js';
import IntegralCalculator from './src/components/integralCalculator.js';
import CalculationMethodCheckbox from './src/components/calculationMethodCheckbox.js';
import IntervalInput from './src/components/intervalInput.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Choose function" component={FunctionCheckbox} />
        <Stack.Screen name="Coefficients input" component={CoefficientsInput} />
        <Stack.Screen name="Interval input" component={IntervalInput} />
        <Stack.Screen
          name="Choose calculation rule"
          component={CalculationMethodCheckbox}
        />
        <Stack.Screen
          name="Integral calculator"
          component={IntegralCalculator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
