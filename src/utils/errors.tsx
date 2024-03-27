export interface ValidationErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface NonFieldErrors {
  message: string;
}
