import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const ContinueBtn = ({navigation, screenName, props}) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => {
        navigation.navigate(screenName, props);
      }}>
      <Text style={styles.btnText}>Continue</Text>
    </TouchableOpacity>
  );
};

export default ContinueBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#3CA1FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    fontSize: 18,
  },
});
