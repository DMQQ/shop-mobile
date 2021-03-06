import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import type { RootStackParams } from "/@types/types";
import useColorTheme from "@utils/context/ThemeContext";
import LoginScreen from "./Screens/Login";
import RegisterScreen from "./Screens/Register";

const Stack = createSharedElementStackNavigator<RootStackParams>();

export default function Auth() {
  const { theme } = useColorTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
        headerTitle: "",
        headerStyle: {
          backgroundColor: theme.primary,
        },
      }}
    >
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Register",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Log in",
        }}
      />
    </Stack.Navigator>
  );
}
