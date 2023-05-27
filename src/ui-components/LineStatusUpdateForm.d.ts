/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { LineStatus } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LineStatusUpdateFormInputValues = {
    maxSlots?: number;
    lastSpotFilled?: number;
};
export declare type LineStatusUpdateFormValidationValues = {
    maxSlots?: ValidationFunction<number>;
    lastSpotFilled?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LineStatusUpdateFormOverridesProps = {
    LineStatusUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    maxSlots?: PrimitiveOverrideProps<TextFieldProps>;
    lastSpotFilled?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LineStatusUpdateFormProps = React.PropsWithChildren<{
    overrides?: LineStatusUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    lineStatus?: LineStatus;
    onSubmit?: (fields: LineStatusUpdateFormInputValues) => LineStatusUpdateFormInputValues;
    onSuccess?: (fields: LineStatusUpdateFormInputValues) => void;
    onError?: (fields: LineStatusUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LineStatusUpdateFormInputValues) => LineStatusUpdateFormInputValues;
    onValidate?: LineStatusUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LineStatusUpdateForm(props: LineStatusUpdateFormProps): React.ReactElement;
