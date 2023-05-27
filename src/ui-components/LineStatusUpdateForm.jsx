/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { LineStatus } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function LineStatusUpdateForm(props) {
  const {
    id: idProp,
    lineStatus: lineStatusModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    maxSlots: "",
    lastSpotFilled: "",
  };
  const [maxSlots, setMaxSlots] = React.useState(initialValues.maxSlots);
  const [lastSpotFilled, setLastSpotFilled] = React.useState(
    initialValues.lastSpotFilled
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = lineStatusRecord
      ? { ...initialValues, ...lineStatusRecord }
      : initialValues;
    setMaxSlots(cleanValues.maxSlots);
    setLastSpotFilled(cleanValues.lastSpotFilled);
    setErrors({});
  };
  const [lineStatusRecord, setLineStatusRecord] =
    React.useState(lineStatusModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(LineStatus, idProp)
        : lineStatusModelProp;
      setLineStatusRecord(record);
    };
    queryData();
  }, [idProp, lineStatusModelProp]);
  React.useEffect(resetStateValues, [lineStatusRecord]);
  const validations = {
    maxSlots: [],
    lastSpotFilled: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          maxSlots,
          lastSpotFilled,
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
          await DataStore.save(
            LineStatus.copyOf(lineStatusRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "LineStatusUpdateForm")}
      {...rest}
    >
      <TextField
        label="Max slots"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxSlots}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              maxSlots: value,
              lastSpotFilled,
            };
            const result = onChange(modelFields);
            value = result?.maxSlots ?? value;
          }
          if (errors.maxSlots?.hasError) {
            runValidationTasks("maxSlots", value);
          }
          setMaxSlots(value);
        }}
        onBlur={() => runValidationTasks("maxSlots", maxSlots)}
        errorMessage={errors.maxSlots?.errorMessage}
        hasError={errors.maxSlots?.hasError}
        {...getOverrideProps(overrides, "maxSlots")}
      ></TextField>
      <TextField
        label="Last spot filled"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={lastSpotFilled}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              maxSlots,
              lastSpotFilled: value,
            };
            const result = onChange(modelFields);
            value = result?.lastSpotFilled ?? value;
          }
          if (errors.lastSpotFilled?.hasError) {
            runValidationTasks("lastSpotFilled", value);
          }
          setLastSpotFilled(value);
        }}
        onBlur={() => runValidationTasks("lastSpotFilled", lastSpotFilled)}
        errorMessage={errors.lastSpotFilled?.errorMessage}
        hasError={errors.lastSpotFilled?.hasError}
        {...getOverrideProps(overrides, "lastSpotFilled")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || lineStatusModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || lineStatusModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
