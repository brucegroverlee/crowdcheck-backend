export interface IValidator {
  validateData(data: any): {
    errors?: any[],
    data?: {
      email: string;
      password: string;
    }
  };
}