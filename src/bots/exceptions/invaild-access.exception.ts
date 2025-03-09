import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAccessException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.FORBIDDEN);
  }
}

