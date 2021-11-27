import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Colors, h1, radius } from "../../constants/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

type AuthFormProps = {
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  header: string;
  error?: string;
};

export default function AuthForm({ onSubmit, header, error }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [EmailError, setEmailError] = useState(!!error);
  const [PasswordError, setPasswordError] = useState(!!error);

  async function Submit() {
    if (email.length > 0 && email.includes("@")) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }

    if (password.length > 5) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }

    if (password.length > 5 && email.length > 0) {
      onSubmit({ email, password });
    }
  }

  return (
    <View style={styles.form}>
      <Text style={[h1, { fontWeight: "bold" }]}>{header}</Text>
      <Text style={{ color: "red", fontSize: 20 }}>{error}</Text>
      <Input
        value={email}
        setValue={setEmail}
        name={"e-mail"}
        placeholder="email"
        style={{
          ...styles.input,
          borderColor: EmailError ? "red" : Colors.text,
          color: EmailError ? "red" : Colors.text,
        }}
        placeholderColor={Colors.text}
        labelStyle={{ color: Colors.text }}
        keyboardType="email-address"
      />
      <Input
        value={password}
        setValue={setPassword}
        name={"password"}
        keyboardType="default"
        placeholder="password"
        style={{
          ...styles.input,
          borderColor: PasswordError ? "red" : Colors.text,
          color: PasswordError ? "red" : Colors.text,
        }}
        placeholderColor={Colors.text}
        labelStyle={{ color: Colors.text }}
        secureTextEntry={true}
      />
      <Button text="Sign In" callback={Submit} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.primary200,
    marginTop: 5,
  },
  btn: {
    width: SCREEN_WIDTH * 0.5,
    marginTop: 20,
    borderColor: Colors.primary200,
    borderWidth: 0.5,
    color: Colors.text,
    justifyContent: "center",
    borderRadius: radius.medium,
  },
});
