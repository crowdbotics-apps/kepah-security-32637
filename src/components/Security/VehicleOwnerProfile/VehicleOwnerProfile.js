import React from "react"
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"

const { width, height } = Dimensions.get("screen")

const ResidentPortal = ({ navigation }) => {
  return (
    <View>
      <View style={{ backgroundColor: "#e5e5e5" }}>
        <Header navigation={navigation} />
      </View>

      <ScrollView style={styles.scroll_view}>
        <View style={styles.screen_name}>
          <View style={styles.portal_view}>
            <Image
              source={require("../../../assets/bg-logo.png")}
              style={styles.logo_img}
            />

            <Text style={{ fontSize: RFValue(18), marginTop: 30 }}>
              Jeep - 235DDC123
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#e5e5e5" }}>
          <View style={styles.visitor_portal_background}>
            <View style={styles.user_profile_photo}>
              <View style={styles.user_photo_view}>
                <Image
                  source={require("../../../assets/profile.jpeg")}
                  style={styles.profile_image}
                />
              </View>
            </View>
            <View style={styles.visitor_view}>
              <View style={styles.inputViewMain}>
                <View style={styles.user_info_view}>
                  <Text style={styles.john_doe_visitor}>Rodney Jones</Text>
                  <Text style={{ fontSize: RFValue(13) }}>Resident</Text>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: "#1a73e8",
                      textDecorationLine: "underline"
                    }}
                  >
                    Contact
                  </Text>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.informBtn}
                  onPress={() => navigation.navigate("Dashboard")}
                >
                  <View style={styles.btnView2}>
                    <Text style={styles.btnText2}>INFORM USER OF ACTION </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={() => navigation.navigate("Dashboard")}
                >
                  <View style={styles.btnView}>
                    <Text style={styles.btnText}>
                      PROCEED WITH VEHICLE ACTION{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#efefef"
  },
  screen_name: { backgroundColor: "#e5e5e5", height: height / 3 },

  inputViewMain: { top: 10 },
  createPass: { fontSize: RFValue(12), color: "#131313" },
  inputView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EAE7F1",
    width: "100%",
    alignItems: "center",
    padding: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5
  },
  input: {
    width: "80%",
    flex: 1,
    color: "#131313"
  },
  bottomButton: { paddingLeft: 15, paddingRight: 15, paddingBottom: 10 },
  informBtn: { paddingLeft: 15, paddingRight: 15, paddingBottom: 10 },
  btnView: {
    backgroundColor: "#1a73e8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  btnView2: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1a73e8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },

  btnText2: { color: "#1a73e8", fontWeight: "bold" },
  scroll_view: { height: height - 60 },
  visitor_portal_view: { backgroundColor: "#e5e5e5", height: height / 4 },
  portal_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70%"
  },
  visitors_portal: {
    fontSize: RFValue(18),
    fontWeight: "bold"
  },
  visitor_portal_background: {
    backgroundColor: "#fff",
    height: height / 2 + 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 20
  },
  user_profile_photo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: -25,
    alignItems: "center"
  },
  user_photo_view: {
    height: 150,
    width: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50
  },
  profile_image: {
    height: 140,
    width: 140,
    bottom: 0,
    position: "absolute",
    borderRadius: 70
  },
  visitor_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: height / 2 - 70
  },
  user_info_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  john_doe_visitor: {
    fontSize: RFValue(20),
    fontWeight: "bold"
  },
  logo_img: { height: height / 12, width: width / 4 + 30 }
})

export default ResidentPortal
