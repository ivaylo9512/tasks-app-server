export default interface Service<T>{
    findById(id: number): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}