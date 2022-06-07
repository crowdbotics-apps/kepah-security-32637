import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const SubmitRequest = ({message, setMessage, sendMessage}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
      <View style={{backgroundColor: '#fff', height: 70}}>
        <View style={{padding: 10}}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder={'Enter message'}
              placeholderTextColor={'#131313'}
              value={message}
              onChangeText={text => {
                setMessage(text);
              }}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                  sendMessage();
                }}
                style={styles.sendbutton}>
                <View style={{width: '100%'}}>
                  <View style={styles.btnView}>
                    <Text style={styles.btnText}>SEND</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#EAE7F1',
    width: '100%',
    alignItems: 'center',
    // paddingLeft: 8,
    // paddingRight: 8,

    height: 40,
    borderRadius: 7,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 5,
    // paddingTop: 5,
    // paddingBottom: 5,
  },
  input: {
    width: '80%',
    flex: 1,
    color: '#131313',
    fontSize: RFValue(12),
    // top: 2
  },
  btnView: {
    backgroundColor: '#2E1070',
    // padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 30,
    width: 100,
  },
  btnText: {color: '#fff', fontWeight: 'bold', fontSize: RFValue(14)},
  sendbutton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubmitRequest;
