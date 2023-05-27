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
export declare type LineStatusCreateFormInputValues = {
    maxSlots?: number;
    lastSpotFilled?: number;
};
export declare type LineStatusCreateFormValidationValues = {
    maxSlots?: ValidationFunction<number>;
    lastSpotFilled?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LineStatusCreateFormOverridesProps = {
    LineStatusCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    maxSlots?: PrimitiveOverrideProps<TextFieldProps>;
    lastSpotFilled?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LineStatusCreateFormProps = React.PropsWithChildren<{
    overrides?: LineStatusCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LineStatusCreateFormInputValues) => LineStatusCreateFormInputValues;
    onSuccess?: (fields: LineStatusCreateFormInputValues) => void;
    onError?: (fields: LineStatusCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LineStatusCreateFormInputValues) => LineStatusCreateFormInputValues;
    onValidate?: LineStatusCreateFormValidationValues;
} & React.CSSProperties>;
export default function LineStatusCreateForm(props: LineStatusCreateFormProps): React.ReactElement;
