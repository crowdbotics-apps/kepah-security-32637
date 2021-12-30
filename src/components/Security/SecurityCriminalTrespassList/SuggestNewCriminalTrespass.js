import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Header from '../Header/Header';
import axios from 'axios';
const { height} = Dimensions.get('screen');

const Confirm = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [setToken] = useState('');
  const [loading] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      }
    } catch (error) {}
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={{backgroundColor: '#e5e5e5'}}>
        <Header navigation={navigation} />
      </View>

      <ScrollView style={styles.scroll_view}>
        <View style={styles.add_visitor_content}>
          <View style={styles.users_info_view}>
            <Text style={styles.user_info}>John Doe</Text>
            <Text style={styles.add_visitor}>
              Suggest New Criminal Trespass
            </Text>
          </View>
        </View>
        <View style={styles.main_content_visitor}>
          <View style={styles.add_visitor_height}>
            <View style={styles.accountTop}>
              <View style={styles.full_name_view}>
                <Text style={styles.star}>*</Text>
                <Text style={styles.cardNum}>Full Name:</Text>
              </View>
              <View style={styles.accountView}>
                <TextInput
                  style={styles.input}
                  onChangeText={text => {
                    setFullName(text);
                  }}
                  value={fullName}
                />
              </View>
            </View>

            <View style={styles.accountTop}>
              <View style={styles.full_name_view}>
                <Text style={styles.star}>*</Text>
                <Text style={styles.cardNum}>Email:</Text>
              </View>
              <View style={styles.accountView}>
                <TextInput
                  style={styles.input}
                  onChangeText={text => {
                    setEmail(text);
                  }}
                  value={email}
                />
              </View>
            </View>

            <View style={styles.accountTop}>
              <View style={styles.full_name_view}>
                <Text style={styles.star}>*</Text>
                <Text style={styles.cardNum}>Phone Number:</Text>
              </View>
              <View style={styles.accountView}>
                <TextInput
                  style={styles.input}
                  onChangeText={text => {
                    setPhoneNo(text);
                  }}
                  value={phoneNo}
                />
              </View>
            </View>
          </View>
          <View style={styles.submit_view}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => navigation.navigate('Dashboard')}>
              <View>
                <View style={styles.btnView}>
                  {!loading ? (
                    <Text style={styles.btnText}>SUBMIT </Text>
                  ) : (
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Text style={styles.btnText}>SUBMITTING </Text>
                      <ActivityIndicator color="white" />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#efefef',
  },
  email: {fontSize: 18, marginTop: 5},

  createPass: {fontSize: 12, color: '#131313'},
  cardNum: {
    fontSize: RFValue(12),
    color: '#131313',
  },
  star: {
    fontSize: RFValue(12),
    color: '#ff0000',
  },
  amount: {
    fontSize: RFValue(12),
    color: '#131313',
    left: 10,
  },

  input: {
    width: '100%',
    flex: 1,
    color: '#131313',
    fontSize: RFValue(12),
    left: 10,
  },
  showPass: {width: 16, height: 10, marginRight: 10, left: 5},
  password: {fontSize: 12, color: '#131313', marginTop: 10},
  eyeDot: {
    borderWidth: 1,
    width: 1,
    height: 1,
    position: 'absolute',
    left: 12,
    top: 4,
  },
  dateView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#EAE7F1',
    width: '25%',
    alignItems: 'center',
    padding: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5,
    justifyContent: 'center',
  },
  yearView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#EAE7F1',
    width: '35%',
    alignItems: 'center',
    padding: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5,
  },
  accountView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E9F1FD',
    width: '100%',
    alignItems: 'center',
    paddingRight: 20,
    height: 40,
    borderRadius: 7,
    marginTop: 5,
  },
  more: {
    width: 10,
    height: 7,
    marginRight: 10,
    left: 5,
  },
  accountTop: {
    marginTop: 10,
  },
  bottomButton: {width: '100%'},
  btnView: {
    backgroundColor: '#1a73e8',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {color: '#fff', fontWeight: 'bold'},
  scroll_view: {height: height - 60, backgroundColor: '#fff'},
  add_visitor_content: {backgroundColor: '#e5e5e5', height: 200},
  users_info_view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  user_info: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  add_visitor: {
    fontSize: RFValue(15),
    marginTop: 5,
  },
  main_content_visitor: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  add_visitor_height: {padding: 20, height: height / 2 + 10, marginBottom: 0},
  full_name_view: {display: 'flex', flexDirection: 'row'},
  make_emergency_view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  border_bottom: {
    borderWidth: 1,
    borderRadius: 2,
    width: 12,
    height: 12,
  },
  make_emergency_contact: {left: 10, fontSize: RFValue(12)},
  submit_view: {marginTop: 10, padding: 20},
});

export default Confirm;
