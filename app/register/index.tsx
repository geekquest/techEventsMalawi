import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  AlertCircleIcon,
  CircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { VStack } from "@/components/ui/vstack";
import { FormControlLabelText } from "@gluestack-ui/themed";
import { FormControlErrorIcon } from "@gluestack-ui/themed";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import useThemeMode from "@/hooks/useThemeMode";
import { router, useLocalSearchParams } from "expo-router";
import { Button, ButtonSpinner } from "@/components/ui/button";
import { Text } from "react-native";
import axios from "axios";
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";

const simpleFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").label("Name"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required")
    .label("Email"),
  phone: Yup.string()
    .required("Phone is required")
    .label("Phone")
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  gender: Yup.string().required("Select one gender").label("Gender"),
});
const advancedFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s.,'-]+$/, "Name must be a valid string")
    .label("Name"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required")
    .label("Email"),
  phone: Yup.string()
    .required("Phone is required")
    .label("Phone")
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  gender: Yup.string().required("Select one gender").label("Gender"),
  company: Yup.string()
    .required("Company is required")
    .matches(/^[a-zA-Z\s.,'-]+$/, "Company must be a valid string")
    .label("Company"),
  position: Yup.string()
    .required("Position is required")
    .matches(/^[a-zA-Z\s.,'-]+$/, "Position must be a valid string")
    .label("Position"),
  address: Yup.string()
    .required("Address is required")
    .matches(/^[a-zA-Z\s.,'-]+$/, "Address must be a valid string")
    .label("Address"),
  city: Yup.string()
    .required("City is required")
    .matches(/^[a-zA-Z\s.,'-]+$/, "City must be a valid string")
    .label("City"),
  country: Yup.string()
    .required("Country is required")
    .matches(/^[a-zA-Z\s.,'-]+$/, "Country must be a valid string")
    .label("Country"),
});

const Register = () => {
  const toast = useToast();
  const { type, form_id } = useLocalSearchParams<{
    type: string;
    form_id: string;
  }>();

  const [processing, setprocessing] = useState(false);

  let event_id = "";

  type === "simple" ? (event_id = "2") : (event_id = "1");

  const simpleFormValues = {
    name: "",
    email: "",
    phone: "",
    gender: "0",
    company: "",
    position: "",
    address: "",
    city: "",
    country: "",
    form_id: form_id,
    event_id: event_id,
    action: "save",
  };

  const uiState = useThemeMode();
  return (
    <KeyboardAvoidingView
      className=" flex-1 bg-primary-950 flex-col px-4"
      behavior="padding"
    >
      <Formik
        initialValues={simpleFormValues}
        validationSchema={
          type === "advanced"
            ? simpleFormValidationSchema
            : advancedFormValidationSchema
        }
        onSubmit={(values) => {
          axios
            .post("https://techeventsmw.com/api/event/register", values)
            .then(() => {
              toast.show({
                placement: "bottom",
                render: ({ id }) => {
                  const toastId = "toast-" + id;
                  return (
                    <Toast nativeID={toastId} action="success" variant="solid">
                      <VStack>
                        <ToastTitle>Let's goo!🔥🔥</ToastTitle>
                        <ToastDescription>
                          Your seat is reserved. We've sent you an email for
                          more details.
                        </ToastDescription>
                      </VStack>
                    </Toast>
                  );
                },
              });
              setTimeout(() => {
                setprocessing(false);
                router.push("/");
              }, 5000);
            })
            .catch((e) => {
              setprocessing(false);
              toast.show({
                placement: "bottom",
                render: ({ id }) => {
                  const toastId = "toast-" + id;
                  return (
                    <Toast nativeID={toastId} action="error" variant="solid">
                      <VStack>
                        <ToastTitle>Oops❗️❗️</ToastTitle>
                        <ToastDescription>
                          There was an error processing your request. Please try
                          again later.
                        </ToastDescription>
                      </VStack>
                    </Toast>
                  );
                },
              });
            });
        }}
      >
        {({
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView showsVerticalScrollIndicator={false} className="px-2">
            <FormControl
              className="mb-2 mt-4"
              isDisabled={false}
              isInvalid={errors.name && touched.name ? true : false}
              isReadOnly={false}
              isRequired={true}
            >
              <VStack space="xs">
                <FormControlLabel className="mb-1">
                  <FormControlLabelText className="text-typography-0">
                    Full Name
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    className="text-typography-0"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    autoCorrect={false}
                    onBlur={handleBlur("name")}
                    placeholder="Full Name"
                    type="text"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.name}</FormControlErrorText>
                </FormControlError>
              </VStack>
            </FormControl>
            <FormControl
              className="mb-2"
              isDisabled={false}
              isInvalid={errors.email && touched.email ? true : false}
              isReadOnly={false}
              isRequired={true}
            >
              <VStack space="xs">
                <FormControlLabel className="mb-1">
                  <FormControlLabelText className=" text-typography-0">
                    Email Address
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    className="text-typography-0"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    autoCorrect={false}
                    onBlur={handleBlur("email")}
                    placeholder="john.doe@example.com"
                    type="text"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.email}</FormControlErrorText>
                </FormControlError>
              </VStack>
            </FormControl>
            <FormControl
              className="mb-2"
              isDisabled={false}
              isInvalid={errors.phone && touched.phone ? true : false}
              isReadOnly={false}
              isRequired={true}
            >
              <VStack space="xs">
                <FormControlLabel className="mb-1">
                  <FormControlLabelText className=" text-typography-0">
                    Phone Number
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    className="text-typography-0"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    autoCorrect={false}
                    onBlur={handleBlur("phone")}
                    placeholder="09XXXXXXXX"
                    type="text"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.phone}</FormControlErrorText>
                </FormControlError>
              </VStack>
            </FormControl>
            <FormControl
              className="mb-2"
              isInvalid={errors.gender && touched.gender ? true : false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className=" text-typography-0">
                  Gender
                </FormControlLabelText>
              </FormControlLabel>
              <RadioGroup
                className="mb-2"
                value={values.gender}
                onChange={(value) => setFieldValue("gender", value)}
              >
                <VStack space="sm">
                  <Radio size="sm" value="0">
                    <RadioIndicator>
                      <RadioIcon
                        className={`${
                          uiState === "light" ? "bg-black" : "bg-white"
                        }`}
                        as={CircleIcon}
                      />
                    </RadioIndicator>
                    <RadioLabel
                      className={`${
                        uiState === "light" ? "text-white" : "text-[#000]"
                      }`}
                    >
                      Male
                    </RadioLabel>
                  </Radio>
                  <Radio size="sm" value="1">
                    <RadioIndicator>
                      <RadioIcon
                        className={`${
                          uiState === "light" ? "bg-black" : "bg-white"
                        }`}
                        as={CircleIcon}
                      />
                    </RadioIndicator>
                    <RadioLabel
                      className={`${
                        uiState === "light" ? "text-white" : "text-[#000]"
                      }`}
                    >
                      Female
                    </RadioLabel>
                  </Radio>
                  <Radio size="sm" value="2">
                    <RadioIndicator>
                      <RadioIcon
                        className={`${
                          uiState === "light" ? "bg-black" : "bg-white"
                        }`}
                        as={CircleIcon}
                      />
                    </RadioIndicator>
                    <RadioLabel
                      className={`${
                        uiState === "light" ? "text-white" : "text-[#000]"
                      }`}
                    >
                      Other
                    </RadioLabel>
                  </Radio>
                  <Radio size="sm" value="3">
                    <RadioIndicator>
                      <RadioIcon
                        className={`${
                          uiState === "light" ? "bg-black" : "bg-white"
                        }`}
                        as={CircleIcon}
                      />
                    </RadioIndicator>
                    <RadioLabel
                      className={`${
                        uiState === "light" ? "text-white" : "text-[#000]"
                      }`}
                    >
                      Prefer not to say
                    </RadioLabel>
                  </Radio>
                </VStack>
              </RadioGroup>
              <FormControlError>
                <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                <FormControlErrorText>{errors.gender}</FormControlErrorText>
              </FormControlError>
            </FormControl>
            {type === "simple" && (
              <>
                <FormControl
                  isInvalid={errors.company && touched.company ? true : false}
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="mb-2"
                >
                  <VStack space="xs">
                    <FormControlLabel className="mb-1">
                      <FormControlLabelText className="text-typography-0">
                        Company
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        className="text-typography-0"
                        value={values.company}
                        onChangeText={handleChange("company")}
                        autoCorrect={false}
                        onBlur={handleBlur("company")}
                        placeholder="Where do you work?"
                        type="text"
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.company}
                      </FormControlErrorText>
                    </FormControlError>
                  </VStack>
                </FormControl>
                <FormControl
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="mb-5"
                  isInvalid={errors.position && touched.position ? true : false}
                >
                  <VStack space="xs">
                    <FormControlLabel className="mb-1">
                      <FormControlLabelText className="text-typography-0">
                        Position
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        className="text-typography-0"
                        value={values.position}
                        onChangeText={handleChange("position")}
                        autoCorrect={false}
                        onBlur={handleBlur("position")}
                        placeholder="Your position"
                        type="text"
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.position}
                      </FormControlErrorText>
                    </FormControlError>
                  </VStack>
                </FormControl>
                <FormControl
                  isInvalid={errors.address && touched.address ? true : false}
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="mb-2"
                >
                  <VStack space="xs">
                    <FormControlLabel className="mb-1">
                      <FormControlLabelText className="text-typography-0">
                        Address
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        className="text-typography-0"
                        value={values.address}
                        onChangeText={handleChange("address")}
                        autoCorrect={false}
                        onBlur={handleBlur("address")}
                        placeholder="Enter your address"
                        type="text"
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.address}
                      </FormControlErrorText>
                    </FormControlError>
                  </VStack>
                </FormControl>
                <FormControl
                  isInvalid={errors.city && touched.city ? true : false}
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="mb-2"
                >
                  <VStack space="xs">
                    <FormControlLabel className="mb-1">
                      <FormControlLabelText className="text-typography-0">
                        City
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        className="text-typography-0"
                        value={values.city}
                        onChangeText={handleChange("city")}
                        autoCorrect={false}
                        onBlur={handleBlur("city")}
                        placeholder="Which city do you live in?"
                        type="text"
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                      <FormControlErrorText>{errors.city}</FormControlErrorText>
                    </FormControlError>
                  </VStack>
                </FormControl>
                <FormControl
                  isInvalid={errors.city && touched.city ? true : false}
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="mb-2"
                >
                  <VStack space="xs">
                    <FormControlLabel className="mb-1">
                      <FormControlLabelText className="text-typography-0">
                        Country
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        className="text-typography-0"
                        value={values.country}
                        onChangeText={handleChange("country")}
                        autoCorrect={false}
                        onBlur={handleBlur("country")}
                        placeholder="Which country do you live in?"
                        type="text"
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.country}
                      </FormControlErrorText>
                    </FormControlError>
                  </VStack>
                </FormControl>
              </>
            )}
            <Button
              variant="solid"
              className="mb-5 mt-3 bg-secondary-0"
              action="secondary"
              onPress={() => {
                handleSubmit();
              }}
            >
              {processing ? (
                <ButtonSpinner />
              ) : (
                <Text className="text-typography-950">Submit</Text>
              )}
            </Button>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default Register;
