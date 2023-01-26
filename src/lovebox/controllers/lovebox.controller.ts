import { Controller, Post, Req, UseGuards, Body, Put } from '@nestjs/common';
import { Request } from 'express';
import { LoveboxService } from '../services/lovebox.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateLoveboxDto, DeleteLoveboxDto } from 'src/dto/lovebox.dto';

@Controller('lovebox')
export class LoveboxController {
  constructor(private loveBoxService: LoveboxService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async createLoveBox(
    @Req() req: Request,
    @Body() body: CreateLoveboxDto,
  ) {
    const { sub }: any = req.user;
    return await this.loveBoxService.createLoveBox({ title: body.title }, sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put('delete')
  public async deleteLoveBox(
    @Req() req: Request,
    @Body() body: DeleteLoveboxDto,
  ) {
    const { sub }: any = req.user;
    return await this.loveBoxService.deleteLovebox({ id: body.id }, sub);
  }
}
