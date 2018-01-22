export interface Model<T> {
  create(payload: Partial<T>): Promise<string>;
  read(id?: string): Promise<T | T[] | undefined>;
  update(id: string, payload: Partial<T>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
