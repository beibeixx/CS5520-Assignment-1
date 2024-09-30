import { StyleSheet, Text, View, Modal, Button, TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Background from '../components/Background';
import { colorHelper } from '../helper/colorHelper';
import Card from '../components/Card';


export default function ConfirmScreen({ visible, userData, onGoBack, onContinue }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
    <Background isTransparent={true}>
        <View style={styles.centeredView}>
          <Card style={styles.modalView}>
            <Text style={styles.modalText}>Hello {userData.name}</Text>
            <Text style={styles.modalText}>Here is the information you entered:</Text>
            <Text style={styles.modalText}>{userData.email}</Text>
            <Text style={styles.modalText}>{userData.phone}</Text>
            <Text style={styles.modalText}>If it is not correct, please go back and edit them.</Text>
            <View style={styles.buttonContainer}>
              <Button title="Go Back" color={colorHelper.secondary} onPress={onGoBack} />
              <Button title="Continue" color={colorHelper.primary} onPress={onContinue} />
          </View>
          </Card>
        </View>
      </Background>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
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