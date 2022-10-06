import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FunctionCheckbox from './src/components/functionCheckbox';
import CoefficientsInput from './src/components/coefficientsInput';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Choose function" component={FunctionCheckbox} />
        <Stack.Screen name="Coefficients input" component={CoefficientsInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
