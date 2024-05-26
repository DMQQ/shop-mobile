import React from "react";
import Avatar from "@modules/User/Avatar/Avatar";
import Animated from "react-native-reanimated";
import styles from "./Sidebar.styles";
import useColorTheme from "@utils/context/ThemeContext";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import NavigationButtons from "./navigation_buttons";
import useListenBackPress from "utils/hooks/useListenBackPress";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";

interface SidebarProps {
  children: React.ReactNode;
  closeSidebar: () => void;
  isOpen: boolean;
  animatedStyle: Animated.AnimateStyle<any>;
  animatedButtons: Animated.AnimateStyle<any>;
}

export default function Sidebar({
  children,
  animatedStyle,
  animatedButtons,
  isOpen,
  closeSidebar,
}: SidebarProps) {
  const navigation = useNavigation<useNavigationProps>();
  const { theme } = useColorTheme();

  const isFocued = useIsFocused();

  useListenBackPress(() => {
    if (isOpen && isFocued) {
      closeSidebar();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert("Exit", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
        },
        { text: "Leave", onPress: () => BackHandler.exitApp() },
      ]);
    }

    return true;
  }, [isOpen, isFocued]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.primary, flex: 1 }]}
    >
      <Animated.View style={[styles.navigation, animatedButtons]}>
        <Avatar hide />

        <NavigationButtons />
      </Animated.View>

      <Animated.View
        style={[
          styles.sidebar,
          animatedStyle,
          { backgroundColor: theme.primary },
        ]}
      >
        {children}
      </Animated.View>
    </SafeAreaView>
  );
}
