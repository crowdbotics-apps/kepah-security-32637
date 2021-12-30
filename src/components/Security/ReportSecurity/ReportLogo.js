import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Header from '../Header/Header';

const {height} = Dimensions.get('screen');

const LogoSecurity = ({navigation}) => {
 
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={styles.main}>
        <Header navigation={navigation} />

        <View style={{height: '90%'}}>
          <View style={styles.security_logo_main_view}>
            <View style={styles.security_report_logo}>
              <Text style={styles.security_report}>Security Report</Text>
              <Text style={styles.logo}>LOGO</Text>
            </View>
            <View style={styles.white_borders_view}>
              <View style={styles.logo_borders}>
                <View style={styles.request_recieved_view}>
                  <Text style={styles.request_security_service}>
                    Request for security services
                  </Text>
                  <Text style={styles.recieved_logged}>
                    recieved and logged.
                  </Text>
                  <View style={styles.security_bottom_border} />
                  <Text style={styles.report_has_been_sent}>
                    Your report has been sent to the
                  </Text>

                  <Text style={styles.management_feedback}>
                    management and you will get the
                  </Text>

                  <Text style={styles.management_feedback}>
                    feedback as soon as possible.
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.back_touchable}
                  onPress={() => navigation.navigate('Dashboard')}>
                  <View style={styles.go_back_view}>
                    <View style={styles.btnView}>
                      <Text style={styles.btnText}>FINISH REPORT </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    height: height,
    width: '100%',
    backgroundColor: '#efefef',
  },
  btnView: {
    backgroundColor: '#1a73e8',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {color: '#fff', fontWeight: 'bold', fontSize: RFValue(14)},
  security_logo_main_view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  security_report_logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
    height: '30%',
  },
  security_report: {fontSize: RFValue(18), fontWeight: 'bold', top: -15},
  logo: {
    fontSize: RFValue(35),
    fontWeight: 'bold',
    top: 20,
    color: '#1a73e8',
  },
  white_borders_view: {padding: 20, width: '100%', height: '70%'},
  logo_borders: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 19,

    shadowOffset: {
      height: 0,
      width: 1,
    },
    elevation: 2,
  },
  request_recieved_view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  request_security_service: {fontSize: RFValue(18), marginTop: 10},
  recieved_logged: {fontSize: RFValue(18)},
  security_bottom_border: {
    borderWidth: 1,
    width: 130,
    marginTop: 20,
    borderColor: '#eaeaea',
  },
  report_has_been_sent: {fontSize: RFValue(18), marginTop: 20},
  management_feedback: {fontSize: RFValue(18), marginTop: 5},
  back_touchable: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  go_back_view: {width: '100%', marginTop: 30},
});

export default LogoSecurity;
