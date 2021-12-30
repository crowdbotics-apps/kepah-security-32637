import React, { useState} from 'react';
import {TextInput} from 'react-native';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Header from '../Header/Header';
const {height, width} = Dimensions.get('screen');

const Confirm = ({navigation}) => {
  const [vehicles] = useState([1, 2, 3, , 5, 7, 9, 5, 7, 9, 7]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.keyboard_avoiding}>
      <View style={{backgroundColor: '#e5e5e5'}}>
        <Header navigation={navigation} />
      </View>

      <ScrollView style={styles.scroll_view}>
        <View style={styles.my_vehicle_text_view}>
          <View style={styles.my_vehicle_view}>
            <Text style={styles.my_vehicle}>Rent Roll</Text>
          </View>

        </View>

        <View style={styles.my_vehicle_background}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: 'center',
            }}>
            <TextInput
              keyboardType="web-search"
              placeholder="Full Name"
              style={{
                borderWidth: 1,
                borderColor: '#aeaeae',
                height: 40,
                width: 150,
                borderRadius: 5,
              }}
            />
            <TextInput
              keyboardType="web-search"
              placeholder="Apt. Number"
              style={{
                borderWidth: 1,
                borderColor: '#aeaeae',
                height: 40,
                width: 150,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                backgroundColor: '#1a73e8',
                padding: 10,
                borderRadius: 5,
              }}>
              <Image
                source={require('../../../assets/security-white-search.png')}
              />
            </View>
          </View>

          <View style={styles.vehicle_names_view}>
            <View>
              <View style={styles.vehicle_number_view}>
                <Text style={{fontSize: RFValue(12), left: 5}}>
                  Name
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('VehicleOwnerProfile')}>
              <Text style={{fontSize: RFValue(12)}}>Apt Number</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom_border} />

          {vehicles.map((val, ind) => {
            return (
              <View>
                <View style={styles.vehicle_names_view}>
                  <View>
                    <View style={styles.vehicle_number_view}>
                      <Text style={styles.vehicle_number}>
                        Braylon Hensley
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('VehicleOwnerProfile')}>
                    <Text style={styles.view_more}>70</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bottom_border} />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('Dashboard')}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>SUBMIT </Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scroll_view: {height: height - 120, backgroundColor: '#fff'},
  my_vehicle_text_view: {backgroundColor: '#e5e5e5', height: 100},
  my_vehicle_view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  my_vehicle: {
    fontSize: RFValue(18),
    fontWeight: '600',
    marginTop: 40,
  },
  my_vehicle_background: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 55,
  },
  vehicle_names_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  vehicle_number: {
    fontSize: RFValue(12),
    left: 5,
    color: '#1a73e8',
    textDecorationLine: 'underline',
  },
  view_more: {
    color: '#1A73E8',
    textDecorationLine: 'underline',
    fontSize: RFValue(12),
  },
  bottom_border: {
    borderWidth: 1,
    borderColor: '#eaeaea',
    marginTop: 10,
  },

  bottomButton: {
    marginTop: 20,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  btnView: {
    backgroundColor: '#1a73e8',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {color: '#fff', fontWeight: 'bold'},
});

export default Confirm;
