import React from "react";
import AuthForm from "@modules/AuthForm/AuthForm";
import useAuth from "utils/hooks/useAuth";
import { Text, Image, Dimensions } from "react-native";
import { Button, Container, Modal } from "@components/index";
import useBoolean from "utils/hooks/useBoolean";
import { Fonts } from "constants/styles";

const { height, width } = Dimensions.get("screen");

export default function LoginScreen() {
  const { onLogin, error, loading, onClear } = useAuth("login", {
    onFailed: () => {
      toggle();
    },
  });

  const { state, toggle } = useBoolean();

  function clear() {
    onClear();
    toggle();
  }

  return (
    <Container centerVertical>
      <AuthForm
        onSubmit={onLogin}
        header="Login"
        loading={loading}
        error={error || ""}
      />

      <Modal
        isVisible={state}
        onBackdropPress={clear}
        animationIn="zoomIn"
        animationOut="zoomOutUp"
        deviceHeight={height}
        onBackButtonPress={clear}
        statusBarTranslucent
        useNativeDriverForBackdrop
        style={{ alignItems: "center", paddingVertical: 20, borderRadius: 40 }}
      >
        <Image
          source={require("@assets/4944051.png")}
          style={{ height: 100, width: 100 }}
        />

        <Text
          style={{
            color: "#fff",
            fontFamily: Fonts.PoppinsBold,
            fontSize: 30,
            marginTop: 10,
          }}
        >
          Ooops...
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontFamily: Fonts.PoppinsRegular,
            lineHeight: 35,
          }}
        >
          Invalid email or password
        </Text>
        <Button
          callback={clear}
          text="Try again"
          variant="primary"
          size="xl"
          borderRadius="full"
          style={{ marginTop: 30, width: width - 40 - 40 }}
        />
      </Modal>
    </Container>
  );
}
