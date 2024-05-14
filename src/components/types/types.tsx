export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    // adicione outros campos, se necessário
  };
  tokens: {
    refresh: string;
    access: string;
  };
}
