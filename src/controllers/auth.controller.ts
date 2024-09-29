
import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDetailDto } from 'src/dtos/auths/AuthDetail.dto';
import { LoginDto } from 'src/dtos/auths/Login.dto';
import { RegisterDto } from 'src/dtos/auths/Register.dto';
import { AuthService } from 'src/services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    content: {
      'application/json': {
        example: {
          success: true,
          user: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            status: 'uncomfirmed',
            role: 'student',
            name: '홍길동',
            email: 'test@dgist.ac.kr',
            department: '기초학부',
            studentId: '2017123456',
            createdAt: '2024-02-20T14:22:22.333Z',
            updatedAt: '2024-02-20T14:22:22.333Z'
          }
        }
      }
    }
  })
  async register(@Body() registerDto: RegisterDto): Promise<AuthDetailDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthDetailDto>{
    return this.authService.login(loginDto);
  }
}
