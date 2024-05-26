import React, { useLayoutEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import useAuth from "utils/hooks/useAuth";
import { ActivityIndicator } from "react-native";
import { Container } from "@components/index";
import useBoolean from "utils/hooks/useBoolean";
import RNModal from "react-native-modal";
import layout from "constants/layout";
import { ScreenNavigationProps } from "/@types/types";
import LoginModal from "../components/LoginModal";
import { Colors } from "constants/styles";

export default function LoginScreen({
  route,
  navigation,
}: ScreenNavigationProps<"Login">) {
  const { state: isVisible, toggle } = useBoolean();
  const { onLogin, error, loading, onClear } = useAuth("login", {
    onFailed: toggle,
  });

  const clearForm = () => {
    onClear();
    toggle();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Welcome Back",
      headerTitleAlign: "center",
    });
  }, []);

  return (
    <Container centerVertical>
      <AuthForm
        initialValues={route.params!}
        onSubmit={onLogin}
        header="Login"
        loading={loading}
        error={error || ""}
      />

      <RNModal
        isVisible={loading}
        deviceHeight={layout.screen.height}
        statusBarTranslucent
        useNativeDriverForBackdrop
        animationIn={"fadeIn"}
      >
        <ActivityIndicator size={"large"} color={Colors.secondary} />
      </RNModal>

      <LoginModal visible={isVisible} clear={clearForm} error={error || ""} />
    </Container>
  );
}
