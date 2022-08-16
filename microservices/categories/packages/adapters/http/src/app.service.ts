import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): Record<string, any> {
    return {
      success: true,
    };
  }
}
