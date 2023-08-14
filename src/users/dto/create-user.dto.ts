import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@email.com',
  })
  email: string;
  @ApiProperty({
    default: 'Jhon Doe',
  })
  fullName: string;
  @ApiProperty({
    default: 'testpass',
  })
  password: string;
}
