/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Reservation } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ReservationCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    email: "",
    publicAddress: "",
    createdAt: "",
    debugInfo: "",
    petCount: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [publicAddress, setPublicAddress] = React.useState(
    initialValues.publicAddress
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [debugInfo, setDebugInfo] = React.useState(initialValues.debugInfo);
  const [petCount, setPetCount] = React.useState(initialValues.petCount);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmail(initialValues.email);
    setPublicAddress(initialValues.publicAddress);
    setCreatedAt(initialValues.createdAt);
    setDebugInfo(initialValues.debugInfo);
    setPetCount(initialValues.petCount);
    setErrors({});
  };
  const validations = {
    email: [],
    publicAddress: [],
    createdAt: [],
    debugInfo: [],
    petCount: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          email,
          publicAddress,
          createdAt,
          debugInfo,
          petCount,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Reservation(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ReservationCreateForm")}
      {...rest}
    >
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              publicAddress,
              createdAt,
              debugInfo,
              petCount,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Public address"
        isRequired={false}
        isReadOnly={false}
        value={publicAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              publicAddress: value,
              createdAt,
              debugInfo,
              petCount,
            };
            const result = onChange(modelFields);
            value = result?.publicAddress ?? value;
          }
          if (errors.publicAddress?.hasError) {
            runValidationTasks("publicAddress", value);
          }
          setPublicAddress(value);
        }}
        onBlur={() => runValidationTasks("publicAddress", publicAddress)}
        errorMessage={errors.publicAddress?.errorMessage}
        hasError={errors.publicAddress?.hasError}
        {...getOverrideProps(overrides, "publicAddress")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              email,
              publicAddress,
              createdAt: value,
              debugInfo,
              petCount,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Debug info"
        isRequired={false}
        isReadOnly={false}
        value={debugInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              publicAddress,
              createdAt,
              debugInfo: value,
              petCount,
            };
            const result = onChange(modelFields);
            value = result?.debugInfo ?? value;
          }
          if (errors.debugInfo?.hasError) {
            runValidationTasks("debugInfo", value);
          }
          setDebugInfo(value);
        }}
        onBlur={() => runValidationTasks("debugInfo", debugInfo)}
        errorMessage={errors.debugInfo?.errorMessage}
        hasError={errors.debugInfo?.hasError}
        {...getOverrideProps(overrides, "debugInfo")}
      ></TextField>
      <TextField
        label="Pet count"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={petCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              email,
              publicAddress,
              createdAt,
              debugInfo,
              petCount: value,
            };
            const result = onChange(modelFields);
            value = result?.petCount ?? value;
          }
          if (errors.petCount?.hasError) {
            runValidationTasks("petCount", value);
          }
          setPetCount(value);
        }}
        onBlur={() => runValidationTasks("petCount", petCount)}
        errorMessage={errors.petCount?.errorMessage}
        hasError={errors.petCount?.hasError}
        {...getOverrideProps(overrides, "petCount")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
