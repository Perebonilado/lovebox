import { IsNotEmpty } from 'class-validator';

export class SendInviteDto {
  @IsNotEmpty()
  recipient: string;

  @IsNotEmpty()
  lovebox_id: string;
}

export class AcceptInviteDto {
  @IsNotEmpty()
  invite_id: string
}
