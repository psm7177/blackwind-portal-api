import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { InvalidAccessException } from '../exceptions/invaild-access.exception';

@Injectable()
export class GuildOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // HTTP 요청이면 무조건 통과
    if (!context.getType()) {
      return true;
    }
    // Discord 메시지 객체 가져오기 (RPC 컨텍스트)
    const message: Message = context.switchToRpc().getData();

    // DM인지 확인 후 차단
    if (!message.guild) {
      throw new InvalidAccessException("이 명령어는 서버에서만 사용할 수 있습니다.");
    }

    return true;
  }
}
