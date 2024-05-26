import { Formik } from "formik";
import React, { useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import schema from "./schema";
import type { UserInputProps } from "utils/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import PasswordToggle from "./components/PasswordToggle";
import { ValidatedInput, Button } from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import layout from "constants/layout";
import PasswordStrength from "./components/PasswordStrength";

interface AuthFormProps {
  onSubmit: ({ email, password }: UserInputProps) => Promise<void> | void;
  header: "Login" | "Register";
  error: string;
  loading: boolean;

  initialValues?: {
    email?: string;
    password?: string;
  };
}

export default function AuthForm({
  onSubmit,
  header,
  error,
  loading,
  initialValues: initialValuesProp,
}: AuthFormProps) {
  const navigation = useNavigation<any>();
  const [vissible, setVissible] = useState(false);

  const isRegister = header === "Register";

  const initialValues = {
    email: initialValuesProp?.email || "",
    password: initialValuesProp?.password || "",
    ...(header === "Register" && { confirmPassword: "" }),
  };

  const inputStyle = [
    styles.input,
    { width: layout.screen.width - 20, paddingVertical: 10 },
  ];

  return (
    <KeyboardAvoidingView style={[styles.form]}>
      <Formik
        enableReinitialize
        validationSchema={schema(isRegister)}
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validateOnChange
      >
        {(formik) => {
          return (
            <>
              <ValidatedInput
                autoFocus
                name="email"
                style={inputStyle}
                label="Email*"
                placeholder="Email"
                leftIcon={(props) => (
                  <AntDesign name="user" size={25} color={props.color} />
                )}
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                clearButtonMode={"always"}
                {...formik}
              />
              <ValidatedInput
                name="password"
                label="Password*"
                style={inputStyle}
                placeholder="Password"
                leftIcon={(props) => (
                  <AntDesign name="lock" size={25} color={props.color} />
                )}
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={!vissible}
                returnKeyType="done"
                clearButtonMode={"always"}
                rightIcon={(props) => (
                  <PasswordToggle
                    setVissible={setVissible}
                    vissible={vissible}
                    isError={props.isError}
                    isFocused={props.isTouched}
                  />
                )}
                {...formik}
              />

              {isRegister && (
                <ValidatedInput
                  style={inputStyle}
                  placeholder="Repeat your password"
                  leftIcon={(props) => (
                    <AntDesign name="lock" size={20} color={props.color} />
                  )}
                  autoComplete="password"
                  autoCorrect={false}
                  secureTextEntry={!vissible}
                  label="Repeat password*"
                  rightIcon={(props) => (
                    <PasswordToggle
                      setVissible={setVissible}
                      vissible={vissible}
                      isError={props.isError}
                      isFocused={props.isTouched}
                    />
                  )}
                  name="confirmPassword"
                  {...formik}
                />
              )}

              {isRegister && (
                <PasswordStrength password={formik.values.password} />
              )}

              <Button
                text={header.toUpperCase()}
                onPress={() => formik.handleSubmit()}
                style={[styles.btn]}
                type="contained"
                variant="primary"
                disabled={
                  !(
                    formik.isValid &&
                    (formik.dirty || !!initialValuesProp?.email) &&
                    !loading &&
                    !error
                  )
                }
                fontStyle={{ fontWeight: "bold" }}
                testID="SUBMIT_BUTTON"
              />

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(isRegister ? "Login" : "Register")
                }
                style={{
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ color: "gray", textDecorationLine: "underline" }}
                >
                  {!isRegister ? "Don't have account?" : "Have an account?"}
                </Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
}
