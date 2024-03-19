import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;

@Injectable()
export class AppService {
  getHello(): string {
    return `Welcome to Home Library Service! Go to <a href="http://localhost:${PORT}/doc/">http://localhost:${PORT}/doc/</a>`;
  }
}
