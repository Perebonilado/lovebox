import { IsNotEmpty } from 'class-validator';

export class CreateLoveboxDto {
  @IsNotEmpty()
  title: string;
}

export class DeleteLoveboxDto {
  @IsNotEmpty()
  id: string;
}

export class LeaveLoveboxDto {
  @IsNotEmpty()
  id: string
}
