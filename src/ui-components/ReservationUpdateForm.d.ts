/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Reservation } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReservationUpdateFormInputValues = {
    email?: string;
    publicAddress?: string;
    createdAt?: string;
    debugInfo?: string;
    petCount?: number;
};
export declare type ReservationUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
    publicAddress?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    debugInfo?: ValidationFunction<string>;
    petCount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReservationUpdateFormOverridesProps = {
    ReservationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    publicAddress?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    debugInfo?: PrimitiveOverrideProps<TextFieldProps>;
    petCount?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReservationUpdateFormProps = React.PropsWithChildren<{
    overrides?: ReservationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    reservation?: Reservation;
    onSubmit?: (fields: ReservationUpdateFormInputValues) => ReservationUpdateFormInputValues;
    onSuccess?: (fields: ReservationUpdateFormInputValues) => void;
    onError?: (fields: ReservationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReservationUpdateFormInputValues) => ReservationUpdateFormInputValues;
    onValidate?: ReservationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ReservationUpdateForm(props: ReservationUpdateFormProps): React.ReactElement;
