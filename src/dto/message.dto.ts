import { IsNotEmpty } from 'class-validator';

export class SendMessageToLoveboxDto {
  @IsNotEmpty()
  lovebox: string;

  @IsNotEmpty()
  message: string;

  image_url: string;

  video_url: string;
}

export class FindMessagesByLoveboxDto {
  @IsNotEmpty()
  lovebox: string;
}
