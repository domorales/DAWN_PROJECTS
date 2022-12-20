interface CredentialRequest {
  email: string;
  password: string;
}

interface CredentialResponse {
  token: string;
  _id: string;
}

export { CredentialRequest, CredentialResponse };
