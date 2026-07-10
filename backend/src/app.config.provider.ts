export const CONFIG_TOKEN = 'CONFIG';

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  username: string;
  password: string;
}

const defaultConfig: AppConfig = {
  database: {
    driver: 'postgres',
    url: 'postgres://localhost:5432/afisha',
    username: 'postgres',
    password: 'postgres',
  },
};

export const configProvider = {
  provide: CONFIG_TOKEN,
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER ?? defaultConfig.database.driver,
      url: process.env.DATABASE_URL ?? defaultConfig.database.url,
      username:
        process.env.DATABASE_USERNAME ?? defaultConfig.database.username,
      password:
        process.env.DATABASE_PASSWORD ?? defaultConfig.database.password,
    },
  },
};
