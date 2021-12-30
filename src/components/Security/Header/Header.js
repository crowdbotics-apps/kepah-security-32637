import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from './Modal';


export const Header = ({navigation}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleModal = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.header_main_view}>
          <View style={styles.header_view}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.go_back_touchable}>
              <View>
                <Image
                  source={require('../../../assets/security-back-2.png')}
                  style={styles.back_image}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.addres_view}>
              <Text style={styles.forest_cove_appartment}>
                Forest Cove Apartments
              </Text>
              <Text style={styles.forest_cove_appartment}>
                9600 Forest Ln, Dallas, TX 75243
              </Text>
            </View>
            <TouchableOpacity
              style={styles.menu_touchable}
              onPress={() => {
                setMenuVisible(!isMenuVisible);
              }}>
              <View>
                <View>
                  <Image
                    source={require('../../../assets/security-menu.png')}
                    style={styles.menu_img}
                  />
                  <Image
                    source={require('../../../assets/security-menu.png')}
                    style={styles.menu_2}
                  />
                  <Image
                    source={require('../../../assets/security-menu.png')}
                    style={styles.menu_2}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{}}>
              <Modal
                isMenuVisible={isMenuVisible}
                setMenuVisible={setMenuVisible}
                navigation={navigation}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header_main_view: {
    backgroundColor: '#fff',
    height: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header_view: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  go_back_touchable: {
    left: -10,
    position: 'absolute',
    width: 70,
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  back_image: {
    height: 20,
    width: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addres_view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  forest_cove_appartment: {fontSize: 12, color: '#131313'},
  menu_touchable: {
    right: 20,
    position: 'absolute',
    width: 70,
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  menu_img: {width: 20},
  menu_2: {marginTop: 2, width: 20},
});

export default Header;
