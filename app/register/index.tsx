import React from "react";
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
import { Button } from "@/components/ui/button";
import { Text } from "react-native";

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
});

const Register = () => {
  const { type } = useLocalSearchParams<{
    type: string;
  }>();

  const simpleFormValues = {
    name: "",
    email: "",
    phone: "",
    gender: "male",
    company: "",
    position: "",
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
          console.log(values);
          router.push("/");
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
                  <Radio size="sm" value="male">
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
                  <Radio size="sm" value="female">
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
                  <Radio size="sm" value="them">
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
                      Them
                    </RadioLabel>
                  </Radio>
                  <Radio size="sm" value="other">
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
              </>
            )}
            <Button
              variant="solid"
              className="mb-5 bg-secondary-0"
              action="secondary"
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text className="text-typography-950">Submit</Text>
            </Button>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default Register;
