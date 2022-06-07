import * as firebase from 'firebase';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Header from '../Header/Header';
import SendMsg from './SendMsg';

const SubmitRequest = ({navigation, route}) => {
  // defining states
  const [message, setMessage] = useState('');
  const [myId, setMyId] = useState(route.params.myId);
  const [selectedUserId] = useState(route.params.user_id);
  const [name] = useState(route.params.name);
  const [allMessages, setAllMessages] = useState([]);
  const [limitToLast, setLimitToLast] = useState(9);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const scrollViewRef = useRef();

  // Loading information when component loads
  useEffect(() => {
    console.log('route', route);
  }, []);

  useEffect(() => {
    let _allMessages = [];
    firebase.default
      .database()
      .ref(`conversation/${myId}-${selectedUserId}`)
      .on('child_added', val => {
        let value = val.val();
        value.id = val.key;
        _allMessages.push(value);
        setAllMessages(_allMessages);
        setLoadingMessages(false);
      });
  }, [myId, limitToLast]);

  const sendMessage = async () => {
    let time = new Date().getTime();

    await firebase.default
      .database()
      .ref(`conversation-users/${myId}-${selectedUserId}`)
      .set({
        myId: myId,
        selectedUserId: selectedUserId,
        message: message,
        name: name,
        time: formatAMPM(new Date(time)),
      });

    await firebase.default
      .database()
      .ref(`conversation-users/${selectedUserId}-${myId}`)
      .set({
        myId: selectedUserId,
        selectedUserId: myId,
        message: message,
        name: name,
        time: formatAMPM(new Date(time)),
      });

    await firebase.default
      .database()
      .ref(`conversation/${myId}-${selectedUserId}`)
      .push({
        userId: myId,
        message: message,
        time: time,
      });
    await firebase.default
      .database()
      .ref(`conversation/${selectedUserId}-${myId}`)
      .push({
        userId: selectedUserId,
        message: message,
        time: time,
      });
    setMessage('');
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({animated: true});
  }, [myId]);

  const formatAMPM = useCallback(date => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  });

  const ifCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    return contentOffset.y == 0;
  };

  const renderItem = ({item}) => {
    return (
      // <View key={ind}>
      //   {val.userId !== myId ? (
      <View style={item.userId !== myId ? styles.viewlft : styles.viewright}>
        <View>
          <Image
            source={require('../../../assets/profile.jpeg')}
            style={styles.profile}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            left: 20,
          }}>
          <View style={item.userId !== myId ? styles.msgleft : styles.msgrgt}>
            <Text>{item.message}</Text>
            <View style={{position: 'absolute', left: -15, top: 30}}>
              <Image
                source={require('../../../assets/curve-2.png')}
                style={item.userId !== myId ? styles.curvelft : styles.curvergt}
              />
            </View>
          </View>

          <View style={item.userId !== myId ? styles.timelft : styles.timergt}>
            <Text style={{fontSize: RFValue(12), color: '#2e1070'}}>
              {formatAMPM(new Date(item.time))}
            </Text>
          </View>
        </View>
      </View>
      // ) : (
      //   <View style={styles.viewright}>
      //     <View
      //       style={{
      //         display: 'flex',
      //         flexDirection: 'row',
      //         left: 20,
      //       }}>
      //       <View style={styles.timergt}>
      //         <Text style={{fontSize: RFValue(12), color: '#2e1070'}}>
      //           {formatAMPM(new Date(val.time))}
      //         </Text>
      //       </View>
      //       <View style={styles.msgrgt}>
      //         <Text>{val.message}</Text>
      //         <View style={{position: 'absolute', right: -15, top: 30}}>
      //           <Image
      //             source={require('../../../assets/curve.png')}
      //             style={styles.curvergt}
      //           />
      //         </View>
      //       </View>
      //     </View>

      //     <View>
      //       <Image
      //         source={require('../../../assets/profile.jpeg')}
      //         style={styles.profile}
      //       />
      //     </View>
      //   </View>
      // )}
      // </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={styles.main}>
        <Header navigation={navigation} />
        <ScrollView
          style={{paddingLeft: 20, paddingTop: 20, paddingRight: 20}}
          ref={scrollViewRef}
          onScroll={({nativeEvent}) => {
            if (ifCloseToTop(nativeEvent)) {
            }
          }}
          scrollEventThrottle={400}>
          <View style={{marginBottom: 100}}>
            {loadingMessages ? <ActivityIndicator color="#2E1070" /> : null}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                // marginTop: -10,
              }}>
              <Text style={{fontSize: RFValue(12)}}>Manager/Resident Log</Text>
            </View>

            {/* <FlatList
              data={allMessages}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              // extraData={selectedId}
            /> */}

            {allMessages.map((val, ind) => {
              return (
                <View key={ind}>
                  {val.userId !== myId ? (
                    <View style={styles.viewlft}>
                      <View>
                        <Image
                          source={require('../../../assets/profile.jpeg')}
                          style={styles.profile}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          left: 20,
                        }}>
                        <View style={styles.msgleft}>
                          <Text>{val.message}</Text>
                          <View
                            style={{position: 'absolute', left: -15, top: 30}}>
                            <Image
                              source={require('../../../assets/curve-2.png')}
                              style={styles.curvelft}
                            />
                          </View>
                        </View>

                        <View style={styles.timelft}>
                          <Text
                            style={{fontSize: RFValue(12), color: '#2e1070'}}>
                            {formatAMPM(new Date(val.time))}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.viewright}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          left: 20,
                        }}>
                        <View style={styles.timergt}>
                          <Text
                            style={{fontSize: RFValue(12), color: '#2e1070'}}>
                            {formatAMPM(new Date(val.time))}
                          </Text>
                        </View>
                        <View style={styles.msgrgt}>
                          <Text>{val.message}</Text>
                          <View
                            style={{position: 'absolute', right: -15, top: 30}}>
                            <Image
                              source={require('../../../assets/curve.png')}
                              style={styles.curvergt}
                            />
                          </View>
                        </View>
                      </View>

                      <View>
                        <Image
                          source={require('../../../assets/profile.jpeg')}
                          style={styles.profile}
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            })}

            {/* <View style={styles.viewlft}>
              <View>
                <Image
                  source={require('../../../assets/profile.jpeg')}
                  style={styles.profile}
                />
              </View>
              <View style={{display: 'flex', flexDirection: 'row', left: 20}}>
                <View style={styles.msgleft}>
                  <Text>
                    The pool is open but your kids need to have an adult with
                    them
                  </Text>
                  <View style={{position: 'absolute', left: -15, top: 30}}>
                    <Image
                      source={require('../../../assets/curve-2.png')}
                      style={styles.curvelft}
                    />
                  </View>
                </View>
                <View style={styles.timelft}>
                  <Text style={{fontSize: RFValue(12), color: '#2e1070'}}>
                    4:14PM
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.viewright}>
              <View style={{display: 'flex', flexDirection: 'row', left: 20}}>
                <View style={styles.timergt}>
                  <Text style={{fontSize: RFValue(12), color: '#2e1070'}}>
                    4:14PM
                  </Text>
                </View>
                <View style={styles.msgrgt}>
                  <Text>Thank you for clarifying.What about food?</Text>
                  <View style={{position: 'absolute', right: -15, top: 30}}>
                    <Image
                      source={require('../../../assets/curve.png')}
                      style={styles.curvergt}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Image
                  source={require('../../../assets/profile.jpeg')}
                  style={styles.profile}
                />
              </View>
            </View> */}
          </View>
        </ScrollView>

        <SendMsg
          sendMessage={sendMessage}
          setMessage={setMessage}
          message={message}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#efefef',
  },
  email: {fontSize: 18, marginTop: 5},

  createPass: {fontSize: RFValue(12), color: '#131313'},
  msgleft: {
    backgroundColor: 'white',
    width: '70%',
    padding: 20,
    borderRadius: 10,
  },
  msgrgt: {
    backgroundColor: 'white',
    width: '70%',
    padding: 20,
    borderRadius: 10,
  },
  curvelft: {
    height: 18,
    width: 15,
  },
  timelft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    left: 10,
  },
  timergt: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    right: 10,
  },
  viewlft: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  viewright: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  curvergt: {
    height: 15,
    width: 15,
  },
  profile: {
    borderRadius: 80,
    height: 35,
    width: 35,
  },
});

export default SubmitRequest;
