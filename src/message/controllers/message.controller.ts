import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  FindMessagesByLoveboxDto,
  SendMessageToLoveboxDto,
} from 'src/dto/message.dto';
import { MessageService } from '../services/message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  public async sendMessage(
    @Req() req: Request,
    @Body() body: SendMessageToLoveboxDto,
  ) {
    const { sub }: any = req.user;
    return await this.messageService.sendMessageToLovebox(body, sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('retrieve')
  public async getMessagesByLoveBox(@Query() query: FindMessagesByLoveboxDto) {
    return await this.messageService.findMessagesByLovebox(query);
  }
}
