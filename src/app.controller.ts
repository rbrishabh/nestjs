import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // @Header('Content-Type', 'text/html')
  login(@Request() req): any {
    return req.user;
  }

  @Get('protected')
  // @Header('Content-Type', 'text/html')
  getHello(): string {
    return this.appService.getHello();
  }
}
