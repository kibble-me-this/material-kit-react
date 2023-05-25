import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerLine = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Line, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly position?: number | null;
  readonly maxLength?: number | null;
  readonly availableSpot?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLine = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Line, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly position?: number | null;
  readonly maxLength?: number | null;
  readonly availableSpot?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Line = LazyLoading extends LazyLoadingDisabled ? EagerLine : LazyLine

export declare const Line: (new (init: ModelInit<Line>) => Line) & {
  copyOf(source: Line, mutator: (draft: MutableModel<Line>) => MutableModel<Line> | void): Line;
}