import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FunctionCheckbox from './src/components/functionCheckbox.js';
import CoefficientsInput from './src/components/coefficientsInput.js';
import IntegralCalculator from './src/components/integralCalculator.js';
import IntervalInput from './src/components/intervalInput.js';

import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import arrow from './assets/icons/arrow.png';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({navigation, route}) => ({
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}>
              <Image source={arrow} style={styles.btnImage} />
            </TouchableOpacity>
          ),
        })}>
        <Stack.Screen
          name="Choose function"
          component={FunctionCheckbox}
          options={{
            headerLeft: () => {},
          }}
        />
        <Stack.Screen name="Coefficients input" component={CoefficientsInput} />
        <Stack.Screen name="Interval input" component={IntervalInput} />
        <Stack.Screen
          name="Integral calculator"
          component={IntegralCalculator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: '#F0F0F0',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnImage: {
    width: 16,
    height: 8,
  },
});
