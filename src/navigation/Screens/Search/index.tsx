import React from "react";
import { NestedSearchScreens } from "/@types/types";
import { createStackNavigator } from "@react-navigation/stack";
import Searched from "./screens/Searched";
import { horizontalAnimation } from "navigation/options";
import Filters from "./screens/Filters";
import Query from "./screens/Query";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createSharedElementStackNavigator<NestedSearchScreens>();

export default function SearchScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Searched"
      screenOptions={{
        ...horizontalAnimation,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Searched"
        sharedElements={(route) => {
          const { prod_id } = route.params;
          return ["prod_id" + prod_id + "Searched"];
        }}
        component={Searched}
      />
      <Stack.Screen name="Filters" component={Filters} />
      <Stack.Screen name="Query" component={Query} />
    </Stack.Navigator>
  );
}
