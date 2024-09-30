import {
  StyleSheet,
  View,
  Modal,
  Button,
} from "react-native";
import React from "react";
import Background from "../components/Background";
import { colorHelper } from "../helper/colorHelper";
import Card from "../components/Card";
import CardText from "../components/CardText";
import ButtonRow from "../components/ButtonSet";

export default function ConfirmScreen({
  visible,
  userData,
  onGoBack,
  onContinue,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <Background isTransparent={true}>
        <View style={styles.centeredView}>
          <Card style={styles.modalView}>
            <CardText style={styles.modalText}>Hello {userData.name}</CardText>
            <CardText style={styles.modalText}>
              Here is the information you entered:
            </CardText>
            <CardText style={styles.modalText}>{userData.email}</CardText>
            <CardText style={styles.modalText}>{userData.phone}</CardText>
            <CardText style={styles.modalText}>
              If it is not correct, please go back and edit them.
            </CardText>
            <ButtonRow>
              <View style={styles.buttonContainer}>
                <Button
                  title="Go Back"
                  color={colorHelper.secondary}
                  onPress={onGoBack}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Continue"
                  color={colorHelper.primary}
                  onPress={onContinue}
                />
              </View>
            </ButtonRow>
          </Card>
        </View>
      </Background>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
  },
  modalText: {
    marginBottom: 5,
  },
  buttonContainer: {
    width: "30%",
    margin: 20,
  },
});
