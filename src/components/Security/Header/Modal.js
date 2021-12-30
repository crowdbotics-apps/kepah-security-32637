import color from 'color';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

const ModalContent = ({isMenuVisible, setMenuVisible, navigation}) => {
  const toggleModal = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <Modal
      animationIn="slideInRight"
      animationInTiming={300}
      animationOut="slideOutRight"
      animationOutTiming={300}
      isVisible={isMenuVisible}
      backdropOpacity={0.0}
      style={styles.modal_menu}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.menu_modal_background}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.profile_touchable}>
          <Image
            source={require('../../../assets/home.png')}
          />
          <Text style={styles.my_profile}>Home</Text>
        </TouchableOpacity>

        <View style={styles.bottom_border} />

        <TouchableOpacity
          onPress={() => {
            toggleModal();
            navigation.navigate('Security');
          }}
          style={styles.profile_touchable}>
          <Image
            source={require('../../../assets/modalProfile.png')}
          />
          <Text style={styles.my_profile}>My Profile</Text>
        </TouchableOpacity>

        <View style={styles.bottom_border} />
        <TouchableOpacity
          onPress={() => {
            toggleModal();

            navigation.navigate('SecurityConversation');
          }}
          style={styles.msg_manager_touchable}>
          <View style={styles.image_view}>
            <Image
              source={require('../../../assets/modalMsg.png')}
            />
            <Text style={styles.msg_dots}>...</Text>
          </View>
          <Text style={styles.my_profile}>Send Message</Text>
        </TouchableOpacity>

        <View style={styles.bottom_border} />

        <View style={styles.sign_out_view}>
          <TouchableOpacity
            onPress={() => {
              toggleModal();

              navigation.navigate('SecurityLogin');
            }}
            style={styles.sign_out_touchable}>
            <Image
              source={require('../../../assets/signOut.png')}
            />
            <Text style={styles.my_profile}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            toggleModal();

            navigation.navigate('SelectProperty');
          }}>
          <View style={styles.btnView}>
            <Text style={styles.btnText}>CHANGE PROPERTY </Text>
            <Image source={require('../../../assets/right-arrow.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
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

  modal_menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    top: 25,
    left: 20,
  },
  menu_modal_background: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 19,
    shadowOffset: {
      height: 0,
      width: 1,
    },
    elevation: 2,
    width: '53%',
  },
  profile_touchable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  my_profile: {left: 10},
  bottom_border: {
    borderWidth: 1,
    width: '100%',
    marginTop: 5,
    borderColor: '#eaeaea',
  },
  msg_manager_touchable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  image_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg_dots: {position: 'absolute', fontSize: 17, top: -7},
  pay_lease_view: {
    borderWidth: 1,
    borderRadius: 20,
    height: 20,
    width: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign_out_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sign_out_touchable: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  qr_image: {display: 'flex', flexDirection: 'row', marginTop: -1},
  btnView: {
    borderWidth: 1,
    borderColor: '#1a73e8',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center'
  },
  btnText: {color: '#1a73e8', fontWeight: 'bold'},
});

export default ModalContent;
