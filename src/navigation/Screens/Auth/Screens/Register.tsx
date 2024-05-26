import React, { useLayoutEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import useAuth from "@utils/hooks/useAuth";
import { Container } from "@components/index";
import RegisterModal from "../components/RegisterModal";
import { ScreenNavigationProps } from "/@types/types";

export default function RegisterScreen({
  navigation,
}: ScreenNavigationProps<"Register">) {
  const [isVisible, setIsVisible] = React.useState(false);

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const { onRegister, error, onClear, loading, status } = useAuth("register", {
    onStart: () => setIsVisible(true),
  });

  function handleSubmit(input: { email: string; password: string }) {
    setCredentials(input);
    onRegister(input);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Welcome stranger",
      headerTitleAlign: "center",
    });
  }, []);

  const onSignInPress = () => {
    if (error) {
      onClear();
      return setIsVisible(false);
    }

    setIsVisible(false);
    navigation.navigate("Login", {
      ...credentials,
    });
  };

  return (
    <Container centerVertical>
      <AuthForm
        loading={loading}
        error={error || ""}
        header="Register"
        onSubmit={handleSubmit}
      />
      <RegisterModal
        onSignInPress={onSignInPress}
        error={error}
        isVisible={isVisible}
        onCloseModal={() => {
          setIsVisible(false);
          onClear();
        }}
      />
    </Container>
  );
}
