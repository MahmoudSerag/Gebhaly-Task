import { createUserDto } from './dto/createUser.dto';
import { loginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  @UsePipes(ValidationPipe)
  async register(@Body() body: createUserDto) {
    const accessToken = await this.authService.register(body);

    return {
      success: true,
      message: 'User Created Successfully.',
      accessToken: accessToken,
    };
  }

  @Post('auth/login')
  @UsePipes(ValidationPipe)
  async login(@Body() body: loginDto) {
    const accessToken = await this.authService.login(body);

    return {
      success: true,
      message: 'User logged in successfully.',
      accessToken: accessToken,
    };
  }

  @Get('user/profile')
  async getUserBasicInfo(@Headers() headers) {
    const user = await this.authService.getUserBasicInfo(headers);

    return { success: true, message: 'Profile data.', user };
  }
  @Patch('user/profile')
  @UsePipes(ValidationPipe)
  async updateUserBasicInfo(@Headers() headers, @Body() body: createUserDto) {
    await this.authService.updateUserBasicInfo(headers, body);

    return { success: true, message: 'User updated successfully.' };
  }
}
