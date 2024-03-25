export interface UserFormValidationErrors {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface UserFormDatabaseErrors {
  message: string;
}
