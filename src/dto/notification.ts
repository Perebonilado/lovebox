import { IsNotEmpty } from 'class-validator';

type Category =
  | 'lovebox_exit'
  | 'lovebox_accepted_request'
  | 'new_lovebox_message';

export class CreateNotificationDto {
  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  lovebox: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;
}
