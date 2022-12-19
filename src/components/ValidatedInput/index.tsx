import Input, { InputProps } from "../../components/ui/Input/Input";
import { FormikProps } from "formik";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface ValidatedInputProps<
  Schema extends {
    [key: string]: string;
  }
> extends FormikProps<Schema>,
    Omit<InputProps, "value" | "setValue"> {
  name: string;
  label?: string;
  placeholder?: string;
  parseValue?: (v: string) => string;
  style: StyleProp<ViewStyle & TextStyle>;

  showLabel?: boolean;
}

export default function ValidatedInput<T extends { [key: string]: string }>({
  errors,
  touched,
  handleChange,
  handleBlur,
  values,
  name,
  label,
  placeholder,
  parseValue = (a) => a,
  style,

  showLabel,
  ...rest
}: ValidatedInputProps<T>) {
  const capitalizeLabel = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <Input
      style={style}
      value={parseValue(values[name])}
      onChangeText={handleChange(name)}
      placeholder={placeholder ?? label ?? capitalizeLabel}
      onBlur={handleBlur(name)}
      error={Boolean(!!errors[name] && touched[name])}
      {...(showLabel && {
        name:
          !!errors[name] && touched[name]
            ? String(errors[name]).toString()
            : label ?? capitalizeLabel,
      })}
      {...rest}
    />
  );
}
