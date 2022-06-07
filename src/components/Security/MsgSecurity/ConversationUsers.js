import React, { useState, useEffect } from "react"
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"
import * as firebase from "firebase"
import axios from "axios"
import pathUrl from "../../../config/path"

const { height } = Dimensions.get("screen")

const LinkBankAccount = ({ navigation }) => {
  const [conversationUsers, setConversationUsers] = useState([])
  const [myId, setMyId] = useState(null)

  const getMessages = myId => {
    firebase.default
      .database()
      .ref(`conversation-users`)
      .orderByChild("myId")
      .equalTo(myId)
      .on("child_added", val => {
        let value = val.val()
        console.log(value)
        setConversationUsers(messages => [...messages, value])
      })
  }

  const getUserDetails = token => {
    axios
      .get(`${pathUrl}/rest-auth/user/`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      .then(response => {
        let myId = response.data.id
        setMyId(myId)
        getMessages(myId)
      })
      .catch(() => {})
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      if (value !== null) {
        getUserDetails(value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.main}>
        <Header navigation={navigation} />

        <ScrollView contentContainerStyle={{ height: height }}>
          <View style={styles._start_new_msg}>
            <View style={styles.msg_manager_view}>
              <Text style={styles.msg_manager}>My conversations</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("StartNewMsg")}
              >
                <Text style={styles.start_new_conversation}>
                  Start New Conversation
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ padding: 20 }}>
              {conversationUsers.map((val, ind) => (
                <TouchableOpacity
                  key={ind}
                  onPress={() =>
                    navigation.navigate("Conversation", {
                      user_id: val.selectedUserId,
                      myId: val.myId,
                      name: val.name
                    })
                  }
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
                          <Text style={styles.user_name}>{val.name}</Text>
                          <View style={styles.user_msg_conversation}>
                            <View>
                              <Image
                                source={require("../../../assets/msg.png")}
                                style={styles.msg_image}
                              />
                              <Text style={styles.msg_dots}>...</Text>
                            </View>
                            <Text style={styles.user_msg}>{val.message}</Text>
                          </View>
                        </View>
                      </View>

                      <View>
                        <Text style={styles.msg_date}>{val.time}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
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
    // marginTop: 5,
    textDecorationLine: "underline",
    color: "#2e1070",
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

  msg_date: { fontSize: RFValue(12), color: "#2e1070" }
})

export default LinkBankAccount
