import { StyleSheet, Text, View, Modal, Button, TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


export default function ConfirmScreen({ visible, userData, onGoBack, onContinue }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
    <LinearGradient
      colors={['rgba(119,200,240,0.9)', 'rgba(116,130,188,0.9)']}
      style={styles.gradient}
    >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello {userData.name}</Text>
            <Text style={styles.modalText}>Here is the information you entered:</Text>
            <Text style={styles.modalText}>{userData.email}</Text>
            <Text style={styles.modalText}>{userData.phone}</Text>
            <Text style={styles.modalText}>If it is not correct, please go back and edit them.</Text>
            <View style={styles.buttonContainer}>
              <Button title="Go Back" color="#B10050" onPress={onGoBack} />
              <Button title="Continue" color="#0013FF" onPress={onContinue} />
          </View>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#959295',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 5,
    fontSize: 16,
    color: '#33009F',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});