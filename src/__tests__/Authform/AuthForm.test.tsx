import "@testing-library/jest-native/extend-expect";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import AuthForm from "../../modules/AuthForm/AuthForm";
import React from "react";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};

  return Reanimated;
});
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("It validates Form", () => {
  test("it renders correctly", () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      <AuthForm error="" loading={false} header="Login" onSubmit={onSubmit} />
    );

    act(() => {
      fireEvent.changeText(
        getByPlaceholderText(/Email/),
        "validemail@gmal.com"
      );
      fireEvent.changeText(getByPlaceholderText(/Password/), "longpassword");

      fireEvent.press(getByTestId("SUBMIT_BUTTON"));
    });

    expect(getByTestId("SUBMIT_BUTTON")).not.toHaveStyle({
      backgroundColor: "#131d33",
    });
  });

  test("shows invalid message if values are incorrect", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, queryByText, queryByTestId } = render(
      <AuthForm error="" loading={false} header="Login" onSubmit={onSubmit} />
    );

    act(() => {
      fireEvent.changeText(getByPlaceholderText(/Email/), "aa");
      fireEvent.changeText(getByPlaceholderText(/Password/), "aa");
    });

    await waitFor(() => {
      queryByText(/Must be at least 6 characters/);
      queryByText(/Please enter valid email/);
      expect(queryByTestId("SUBMIT_BUTTON")).toBeDisabled();
    });
  });

  test("it handles validation successfully then changes screen", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <AuthForm error="" loading={false} header="Login" onSubmit={onSubmit} />
    );

    act(() => {
      fireEvent.changeText(
        getByPlaceholderText(/Email/),
        "testingemail@gmail.com"
      );
      fireEvent.changeText(
        getByPlaceholderText(/Password/),
        "atleast6characters"
      );
    });

    await waitFor(() => {
      expect(getAllByText("6-60 characters*").length).toEqual(2);
    });
  });
});
