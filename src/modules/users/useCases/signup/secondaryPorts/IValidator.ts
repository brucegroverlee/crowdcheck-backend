export interface IValidator {
  validateData(data: any): {
    errors?: any[],
    data?: {
      name: string;
      email: string;
      password: string;
    }
  };
}