export const CONFIG_TOKEN = 'CONFIG';

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

const defaultConfig: AppConfig = {
  database: {
    driver: 'mongodb',
    url: 'mongodb://localhost:27017/prac',
  },
};

export const configProvider = {
  provide: CONFIG_TOKEN,
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER ?? defaultConfig.database.driver,
      url: process.env.DATABASE_URL ?? defaultConfig.database.url,
    },
  },
};
