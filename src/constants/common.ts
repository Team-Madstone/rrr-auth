export const NODE_ENV = {
  Development: "development",
  Production: "production",
};

export const DOMAIN = {
  [NODE_ENV.Development]: "http://localhost:3000",
  [NODE_ENV.Production]: "",
}[process.env.NODE_ENV ?? NODE_ENV.Development];

export const API_DOMAIN = {
  [NODE_ENV.Development]: "http://localhost:4000",
  [NODE_ENV.Production]: "",
}[process.env.NODE_ENV ?? NODE_ENV.Development];
