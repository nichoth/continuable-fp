
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

export function join<A> (
    continuable: Continuable<Continuable<A>>
): Continuable<A>

export function either<A, B> (
    left: (err: Error) => Continuable<B>,
    right: (value: A) => Continuable<B>,
    source: Continuable<A>
): Continuable<B>

