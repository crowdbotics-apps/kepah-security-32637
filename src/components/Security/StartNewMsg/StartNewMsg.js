import React from "react"
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"

const { height } = Dimensions.get("screen")

const LinkBankAccount = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.main}>
        <Header navigation={navigation} />

        <ScrollView contentContainerStyle={{ height: height }}>
          <View style={{}}>
            <View style={styles._start_new_msg}>
              <View style={styles.msg_manager_view}>
                <Text style={styles.msg_manager}>Security Administrators</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MsgConversation")}
                >
                  <Text style={styles.start_new_conversation}>
                    Start New Conversation
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ padding: 20 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MsgConversation")}
              >
                <View style={styles.msg_conversation_1}>
                  <View style={styles.conversation_view}>
                    <View style={styles.user_conversation}>
                      <View>
                        <Image
                          source={require("../../../assets/profile.jpeg")}
                          style={styles.user_profile_image}
                        />
                      </View>
                      <View style={{ marginLeft: 20 }}>
                        <Text style={styles.user_name}>
                          Security Administrator 1
                        </Text>
                        <View style={styles.user_msg_conversation}>
                          <View>
                            <Image
                              source={require("../../../assets/msg.png")}
                              style={styles.msg_image}
                            />
                            <Text style={styles.msg_dots}>...</Text>
                          </View>
                          <Text style={styles.user_msg}>Hi, I need...</Text>
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.msg_date}>4:14PM</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("MsgConversation")}
              >
                <View style={styles.conversation_view_msg}>
                  <View style={styles.conversation_view}>
                    <View style={styles.user_conversation}>
                      <View>
                        <Image
                          source={require("../../../assets/profile.jpeg")}
                          style={styles.user_profile_image}
                        />
                      </View>
                      <View style={{ marginLeft: 20 }}>
                        <Text style={styles.user_name}>
                          Security Administrator 2
                        </Text>
                        <View style={styles.user_msg_conversation}>
                          <View>
                            <Image
                              source={require("../../../assets/msg.png")}
                              style={styles.msg_image}
                            />
                            <Text style={styles.msg_dots}>...</Text>
                          </View>
                          <Text style={styles.user_msg}>I was Looking...</Text>
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.msg_date}>June 27</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("MsgConversation")}
              >
                <View style={styles.conversation_view_msg}>
                  <View style={styles.conversation_view}>
                    <View style={styles.user_conversation}>
                      <View>
                        <Image
                          source={require("../../../assets/profile.jpeg")}
                          style={styles.user_profile_image}
                        />
                      </View>
                      <View style={{ marginLeft: 20 }}>
                        <Text style={styles.user_name}>
                          Security Administrator 3
                        </Text>
                        <View style={styles.user_msg_conversation}>
                          <View>
                            <Image
                              source={require("../../../assets/msg.png")}
                              style={styles.msg_image}
                            />
                            <Text style={styles.msg_dots}>...</Text>
                          </View>
                          <Text style={styles.user_msg}>Hi, can you...</Text>
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.msg_date}>June 27</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.maintenance_supervisor_view}>
                <Text style={styles.maintenance_supervisor}>
                  Other Conversations
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("MsgConversation")}
              >
                <View style={styles.conversation_view_msg}>
                  <View style={styles.conversation_view}>
                    <View style={styles.user_conversation}>
                      <View>
                        <Image
                          source={require("../../../assets/profile.jpeg")}
                          style={styles.user_profile_image}
                        />
                      </View>
                      <View style={{ marginLeft: 20 }}>
                        <Text style={styles.user_name}>Manager 1</Text>
                        <View style={styles.user_msg_conversation}>
                          <View>
                            <Image
                              source={require("../../../assets/msg.png")}
                              style={styles.msg_image}
                            />
                            <Text style={styles.msg_dots}>...</Text>
                          </View>
                          <Text style={styles.user_msg}>Hi, I need...</Text>
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.msg_date}>4:14PM</Text>
                    </View>
                  </View>

                  <View style={styles.new_msg_quantity}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>3</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("MsgConversation")}
              >
                <View style={styles.conversation_view_msg}>
                  <View style={styles.conversation_view}>
                    <View style={styles.user_conversation}>
                      <View>
                        <Image
                          source={require("../../../assets/profile.jpeg")}
                          style={styles.user_profile_image}
                        />
                      </View>
                      <View style={{ marginLeft: 20 }}>
                        <Text style={styles.user_name}>Manager 2</Text>
                        <View style={styles.user_msg_conversation}>
                          <View>
                            <Image
                              source={require("../../../assets/msg.png")}
                              style={styles.msg_image}
                            />
                            <Text style={styles.msg_dots}>...</Text>
                          </View>
                          <Text style={styles.user_msg}>I was Looking...</Text>
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.msg_date}>June 27</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#efefef"
  },
  _start_new_msg: {
    height: 80
  },
  msg_manager_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  msg_manager: {
    fontSize: RFValue(18),
    fontWeight: "bold"
  },
  start_new_conversation: {
    fontSize: RFValue(13),
    textDecorationLine: "underline",
    color: "#1a73e8",
    top: 10
  },
  msg_conversation_1: {
    backgroundColor: "#fff",
    borderRadius: 10,
    zIndex: -1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 8.3,

    elevation: 100,
    padding: 15,
    marginTop: 10
  },
  conversation_view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  user_conversation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  user_profile_image: {
    borderRadius: 80,
    height: 50,
    width: 50
  },
  user_name: { fontSize: RFValue(13) },
  user_msg_conversation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  msg_image: { height: 15, width: 16 },
  msg_dots: {
    position: "absolute",
    top: -7,
    left: 2,
    color: "#848484"
  },
  user_msg: {
    fontSize: RFValue(13),
    color: "#848484",
    left: 5
  },
  conversation_view_msg: {
    backgroundColor: "#fff",
    borderRadius: 10,
    zIndex: -1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 8.3,
    elevation: 100,
    padding: 15,
    marginTop: 10
  },
  maintenance_supervisor_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 70
  },
  maintenance_supervisor: {
    fontSize: RFValue(18),
    fontWeight: "bold"
  },
  new_msg_quantity: {
    position: "absolute",
    top: -12,
    right: -10,
    backgroundColor: "#ff0000",
    borderRadius: 20,
    height: 28,
    width: 28,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff"
  },
  msg_date: { fontSize: RFValue(12), color: "#1a73e8" }
})

export default LinkBankAccount
