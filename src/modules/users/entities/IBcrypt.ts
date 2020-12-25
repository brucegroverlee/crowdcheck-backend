export interface IBcrypt {
  hash(password: string): Promise<string>;
  verify(password: string): Promise<boolean>;
}