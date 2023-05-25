/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LineCreateFormInputValues = {
    name?: string;
    email?: string;
    position?: number;
    maxLength?: number;
    availableSpot?: number;
};
export declare type LineCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    position?: ValidationFunction<number>;
    maxLength?: ValidationFunction<number>;
    availableSpot?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LineCreateFormOverridesProps = {
    LineCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    maxLength?: PrimitiveOverrideProps<TextFieldProps>;
    availableSpot?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LineCreateFormProps = React.PropsWithChildren<{
    overrides?: LineCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LineCreateFormInputValues) => LineCreateFormInputValues;
    onSuccess?: (fields: LineCreateFormInputValues) => void;
    onError?: (fields: LineCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LineCreateFormInputValues) => LineCreateFormInputValues;
    onValidate?: LineCreateFormValidationValues;
} & React.CSSProperties>;
export default function LineCreateForm(props: LineCreateFormProps): React.ReactElement;
