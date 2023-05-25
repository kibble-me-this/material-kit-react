/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Line } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LineUpdateFormInputValues = {
    name?: string;
    email?: string;
    position?: number;
    maxLength?: number;
    availableSpot?: number;
};
export declare type LineUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    position?: ValidationFunction<number>;
    maxLength?: ValidationFunction<number>;
    availableSpot?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LineUpdateFormOverridesProps = {
    LineUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    maxLength?: PrimitiveOverrideProps<TextFieldProps>;
    availableSpot?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LineUpdateFormProps = React.PropsWithChildren<{
    overrides?: LineUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    line?: Line;
    onSubmit?: (fields: LineUpdateFormInputValues) => LineUpdateFormInputValues;
    onSuccess?: (fields: LineUpdateFormInputValues) => void;
    onError?: (fields: LineUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LineUpdateFormInputValues) => LineUpdateFormInputValues;
    onValidate?: LineUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LineUpdateForm(props: LineUpdateFormProps): React.ReactElement;
