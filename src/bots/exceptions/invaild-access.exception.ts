import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAccessException extends HttpException {
  constructor() {
    super('이 명령어는 서버에서만 사용할 수 있습니다.', HttpStatus.FORBIDDEN);
  }
}

