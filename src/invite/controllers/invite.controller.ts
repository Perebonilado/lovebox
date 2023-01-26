import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SendInviteDto } from 'src/dto/invite.dto';
import { SendInviteSuccessResponse } from 'src/interfaces/invite';
import { InviteService } from '../services/invite.service';
import { AcceptInviteDto } from 'src/dto/invite.dto';
import { GenericSuccess } from 'src/interfaces/common';

@Controller('invite')
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  public async sendInvite(
    @Body() body: SendInviteDto,
    @Req() req: Request,
  ): Promise<SendInviteSuccessResponse> {
    const { sub }: any = req.user;
    const { lovebox_id, recipient } = body;
    return await this.inviteService.sendInvite({ lovebox_id, recipient }, sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('accept')
  public async acceptInvite(
    @Body() body: AcceptInviteDto,
    @Req() req: Request,
  ): Promise<GenericSuccess> {
    const { sub }: any = req.user
    return await this.inviteService.acceptInvite(body.invite_id, sub)
  }
}
