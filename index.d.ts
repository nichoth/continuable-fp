
/*~ If this module has methods, declare them as functions like so.
 */
// export function myMethod(a: string): string;
// export function myOtherMethod(a: number): number;

export interface Continuable<T> {
    (cb: (err: Error, value: T) => void): void
}

export function map<A, B> (
    predicate: (a: A) => B,
    con: Continuable<A>
): Continuable<B>

export function of<A> (value: A): Continuable<A>

export function join<A> (continuable: Continuable<Continuable<A>>): Continuable<A>

export function either<A, B> (
    left: (err: Error) => Continuable<B>,
    right: (value: A) => Continuable<B>,
    source: Continuable<A>
): Continuable<B>



/*~ You can declare types that are available via importing the module */
// export interface someType {
//     name: string;
//     length: number;
//     extras?: string[];
// }

/*~ You can declare properties of the module using const, let, or var */
// export const myField: number;

/*~ If there are types, properties, or methods inside dotted names
 *~ of the module, declare them inside a 'namespace'.
 */
// export namespace subProp {
//     /*~ For example, given this definition, someone could write:
//      *~   import { subProp } from 'yourModule';
//      *~   subProp.foo();
//      *~ or
//      *~   import * as yourMod from 'yourModule';
//      *~   yourMod.subProp.foo();
//      */
//     export function foo(): void;
// }
