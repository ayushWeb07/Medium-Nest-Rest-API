export interface IServerConfig {
  port: number;
  env: string;

  jwtAccessSecretKey: string;
  jwtAccessExpires: number;
  jwtRefreshSecretKey: string;
  jwtRefreshExpires: number;

  apiVersion: string;
}
