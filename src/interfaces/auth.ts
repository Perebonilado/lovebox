export interface SignupSuccessResponse {
  message: string;
  token: string;
}

export interface JwtValidatePayload {
  user: {
    email: string;
    sub: string;
  };
  iat: number;
}
