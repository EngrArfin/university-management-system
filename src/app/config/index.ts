import dotenv, { config } from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  school_database_url: process.env.SCHOOL_DATABASE_URL,
};
