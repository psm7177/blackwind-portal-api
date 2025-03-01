// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from 'src/services/user.services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 토큰 추출
      ignoreExpiration: false, // 토큰 만료 확인
      secretOrKey: process.env.JWT_SECRET, // 비밀키 설정
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub); // 페이로드에서 유저 ID (sub)를 이용해 사용자 검색
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // req.user에 저장될 객체
  }
}
