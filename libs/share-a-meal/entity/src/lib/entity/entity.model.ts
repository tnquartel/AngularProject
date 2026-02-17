/**
 * Base class for all entities that are part of communication to/from services.
 */

export type Id = string;

export interface IEntity {
    readonly _id: Id;
}
