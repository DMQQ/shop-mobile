import * as yup from "yup";

export default (hasConfirmPassword: boolean) =>
  yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .trim()
      .required("Email is required"),
    password: yup
      .string()
      .trim()
      .min(6, ({ min }) => `Must be at least ${min} characters`)
      .required("Password is required"),

    ...(hasConfirmPassword && {
      confirmPassword: yup
        .string()
        .trim()
        .equals([yup.ref("password")], "Passwords must match")
        .required(),
    }),
  });
