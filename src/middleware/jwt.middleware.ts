import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      const decoded = this.jwtService.verify(token);
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}