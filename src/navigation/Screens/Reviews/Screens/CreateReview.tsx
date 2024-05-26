import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Text,
  ScrollView,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ScreenNavigationProps } from "/@types/types";
import { Button, Input, ValidatedInput } from "@components/index";
import useListenKeyboard from "utils/hooks/useListenKeyboard";
import StarsTouch from "@components/Stars/Stars";
import schema from "../schema";
import { createStyles as styles } from "../Reviews.styles";
import ResponseModal from "../components/ResponseModal";
import useUploadReview from "../hooks/useUploadReview";

export default function CreateReview({
  route,
  navigation,
}: ScreenNavigationProps<"CreateReview">) {
  const { prod_id, thumbnail, sharedID, prod_name } = route.params;
  const [rating, setRating] = useState(0);
  const { response, upload, setResponse } = useUploadReview();

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <SharedElement id={`prod_id.${prod_id}${sharedID}`}>
          <Image
            source={{ uri: thumbnail }}
            style={styles.img}
            resizeMode="contain"
            resizeMethod="scale"
          />
        </SharedElement>

        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: "flex-start",
          }}
        >
          <Text
            textBreakStrategy="highQuality"
            lineBreakMode="clip"
            numberOfLines={4}
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              width: 225,
            }}
          >
            {prod_name}
          </Text>
        </View>
      </View>

      <ResponseModal
        state={response}
        onCloseModal={() => setResponse({})}
        onSuccess={() => navigation?.navigate("Home")}
        isVisible={response.hasFinished || false}
      />

      <KeyboardAvoidingView
        behavior="padding"
        style={{ alignItems: "center", flex: 1 }}
      >
        <Formik
          initialValues={{
            description: "",
            title: "",
          }}
          validationSchema={schema}
          onSubmit={(data) =>
            upload({
              variables: {
                ...data,
                prod_id,
                rating,
              },
            })
          }
        >
          {(f) => (
            <>
              <StarsTouch setRating={setRating} />
              <View style={{ flex: 2 }}>
                <ValidatedInput
                  {...f}
                  name="title"
                  label="Title"
                  placeholder="Tile of your review"
                  placeholderTextColor="gray"
                />
                <ValidatedInput
                  {...f}
                  name="description"
                  label="Description"
                  placeholder="Your review here"
                  numberOfLines={5}
                  textAlign="left"
                  textAlignVertical="top"
                  placeholderTextColor="gray"
                />
              </View>

              <Button
                type="contained"
                variant="primary"
                disabled={!(f.isValid && f.dirty && rating)}
                text="Share your review"
                callback={() => f.handleSubmit()}
                style={[styles.button]}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
