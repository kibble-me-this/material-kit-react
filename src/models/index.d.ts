import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerReservation = {
  readonly email?: string | null;
  readonly petCount?: number | null;
  readonly publicAddress?: string | null;
  readonly createdAt?: string | null;
}

type LazyReservation = {
  readonly email?: string | null;
  readonly petCount?: number | null;
  readonly publicAddress?: string | null;
  readonly createdAt?: string | null;
}

export declare type Reservation = LazyLoading extends LazyLoadingDisabled ? EagerReservation : LazyReservation

export declare const Reservation: (new (init: ModelInit<Reservation>) => Reservation)

type EagerPet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reservation?: Reservation | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reservation?: Reservation | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Pet = LazyLoading extends LazyLoadingDisabled ? EagerPet : LazyPet

export declare const Pet: (new (init: ModelInit<Pet>) => Pet) & {
  copyOf(source: Pet, mutator: (draft: MutableModel<Pet>) => MutableModel<Pet> | void): Pet;
}

type EagerLineStatus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LineStatus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly maxSlots?: number | null;
  readonly lastSpotFilled?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLineStatus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LineStatus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly maxSlots?: number | null;
  readonly lastSpotFilled?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LineStatus = LazyLoading extends LazyLoadingDisabled ? EagerLineStatus : LazyLineStatus

export declare const LineStatus: (new (init: ModelInit<LineStatus>) => LineStatus) & {
  copyOf(source: LineStatus, mutator: (draft: MutableModel<LineStatus>) => MutableModel<LineStatus> | void): LineStatus;
}