import { ScrollView, View } from "react-native";
import React from "react";
import Sidebar from "@modules/Sidebar";
import Header from "modules/Header";
import Categories from "modules/Categories";
import DailySale from "modules/DailySale";
import AuctionsNavigator from "modules/AuctionsNavigator";
import Carusels from "./components/Carusels";
import useAnimate from "./hooks/useAnimate";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import ReviewCards from "modules/ReviewCards";

export default function Home() {
  const {
    animatedButtons,
    animatedStyle,
    toggle,
    isVissible,
    onClose,
    onGestureEvent,
  } = useAnimate();

  return (
    <Sidebar
      isOpen={isVissible}
      closeSidebar={onClose}
      animatedStyle={animatedStyle}
      animatedButtons={animatedButtons}
    >
      <GestureDetector gesture={onGestureEvent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <Header toggleSidebar={toggle} />
          <Categories />

          {/* <Promotions /> */}

          <DailySale />

          <ReviewCards />

          <AuctionsNavigator />

          <Carusels />

          <View style={{ marginVertical: 15 }} />
        </ScrollView>
      </GestureDetector>
    </Sidebar>
  );
}
