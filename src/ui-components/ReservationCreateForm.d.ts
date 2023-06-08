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
export declare type ReservationCreateFormInputValues = {
    email?: string;
    publicAddress?: string;
    createdAt?: string;
    debugInfo?: string;
    petCount?: number;
};
export declare type ReservationCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    publicAddress?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    debugInfo?: ValidationFunction<string>;
    petCount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReservationCreateFormOverridesProps = {
    ReservationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    publicAddress?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    debugInfo?: PrimitiveOverrideProps<TextFieldProps>;
    petCount?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReservationCreateFormProps = React.PropsWithChildren<{
    overrides?: ReservationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReservationCreateFormInputValues) => ReservationCreateFormInputValues;
    onSuccess?: (fields: ReservationCreateFormInputValues) => void;
    onError?: (fields: ReservationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReservationCreateFormInputValues) => ReservationCreateFormInputValues;
    onValidate?: ReservationCreateFormValidationValues;
} & React.CSSProperties>;
export default function ReservationCreateForm(props: ReservationCreateFormProps): React.ReactElement;
