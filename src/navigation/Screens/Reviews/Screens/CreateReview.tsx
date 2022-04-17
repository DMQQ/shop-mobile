import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import { View, Image, KeyboardAvoidingView } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ScreenNavigationProps } from "/@types/types";
import { Button, Input, Message } from "@components/index";
import { API } from "@constants/routes";
import { useUser } from "@utils/context/UserContext";
import useListenKeyboard from "utils/hooks/useListenKeyboard";
import StarsTouch from "@modules/Stars/Stars";
import schema from "../schema";
import { createStyles as styles } from "../Reviews.styles";

export default function CreateReview({
  route,
}: ScreenNavigationProps<"CreateReview">) {
  const { prod_id, thumbnail, sharedID } = route.params;
  const { user } = useUser();
  const [rating, setRating] = useState(0);

  const { status, variants } = useListenKeyboard();

  const [response, setResponse] = useState("");

  async function PostReview({ description, title }: any) {
    axios
      .post(
        `${API}/ratings`,
        { prod_id, description, title, rating },
        {
          headers: {
            token: user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setResponse("Success");
      })
      .catch((err) => {
        console.log(err?.response?.body);
        setResponse("Failed");
      });
  }

  return (
    <View style={styles.container}>
      {status === variants.closed && (
        <SharedElement id={`prod_id.${prod_id}${sharedID}`}>
          <Image
            source={{ uri: thumbnail }}
            style={styles.img}
            resizeMode="cover"
            resizeMethod="scale"
          />
        </SharedElement>
      )}

      {!!response && <Message status={response} />}

      <KeyboardAvoidingView style={{ alignItems: "center" }}>
        <Formik
          initialValues={{
            description: "",
            title: "",
          }}
          validationSchema={schema}
          onSubmit={PostReview}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            isValid,
            values,
            dirty,
            touched,
          }) => (
            <>
              <StarsTouch setRating={setRating} />
              <Input
                value={values.title}
                setValue={handleChange("title")}
                onBlur={handleBlur("title")}
                placeholder="Title"
                name={"Title"}
                helperText={errors.title || "Atleast 6 characters*"}
                error={!!errors.title && touched.title}
                style={styles.input}
              />
              <Input
                value={values.description}
                setValue={handleChange("description")}
                onBlur={handleBlur("description")}
                placeholder="Description"
                name={"Description"}
                helperText={errors.description || "Atleast 6 characters*"}
                style={styles.input}
                error={!!errors.description && touched.description}
                scrollEnabled
                multiline
                textAlignVertical="top"
                numberOfLines={5}
              />

              <Button
                variant="primary"
                disabled={!(isValid && dirty)}
                text="Add review"
                callback={handleSubmit}
                style={[styles.button]}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
}
