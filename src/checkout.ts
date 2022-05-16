export interface ICheckout<T> {
    scan(item: T): void;
    total(): number;
}