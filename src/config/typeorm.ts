import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { Price } from "src/prices/price.entity";
import { Product } from "src/products/product.entity";
import { Store } from "src/stores/store.entity";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    ...(process.env.DATABASE_URL
      ? { url: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
      : {
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10) || 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        }),
        entities: [Price,Product,Store],
        migrations: ["dist/migrations/*{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: false,
  }

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);