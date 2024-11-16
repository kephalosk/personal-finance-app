export interface Config {
  BASE_PATH: string;
  API_BASE_PATH: string;
}

const BASE_PATH = process.env.BASE_PATH || `${window.location.origin}`;
const API_BASE_PATH = `${BASE_PATH}/api`;

export const AppConfig: Config = {
  BASE_PATH,
  API_BASE_PATH,
};
