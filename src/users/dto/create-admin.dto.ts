import { IsNotEmpty, IsString, IsEmail, MinLength, IsIn } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty() // Bu qiymat bo'sh bo'lmasligini ta'minlaydi
  @IsString() // Bu qiymat string turida bo'lishini ta'minlaydi
  @IsIn(['admin']) // Faqat 'admin' qiymatini qabul qiladi
  role: string;
}
