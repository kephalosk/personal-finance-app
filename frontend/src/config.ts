interface Config {
  API_BACKEND_HOST: string;
}

// const API_BACKEND_HOST = 'https://backend.philippkraatz.com/api';
const API_BACKEND_HOST = 'http://localhost:3000';

export const AppConfig: Config = {
  API_BACKEND_HOST,
};
