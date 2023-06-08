import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerReservation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservation, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly publicAddress?: string | null;
  readonly createdAt?: string | null;
  readonly debugInfo?: string | null;
  readonly petCount?: number | null;
  readonly updatedAt?: string | null;
}

type LazyReservation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservation, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly publicAddress?: string | null;
  readonly createdAt?: string | null;
  readonly debugInfo?: string | null;
  readonly petCount?: number | null;
  readonly updatedAt?: string | null;
}

export declare type Reservation = LazyLoading extends LazyLoadingDisabled ? EagerReservation : LazyReservation

export declare const Reservation: (new (init: ModelInit<Reservation>) => Reservation) & {
  copyOf(source: Reservation, mutator: (draft: MutableModel<Reservation>) => MutableModel<Reservation> | void): Reservation;
}