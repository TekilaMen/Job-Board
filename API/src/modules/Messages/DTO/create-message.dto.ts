import { IsNotEmpty, IsString, IsInt, MinLength } from 'class-validator';

export class CreateMessageDto {
@MinLength(2)
@IsString()
contenu: string;

@IsNotEmpty()
@IsInt()
idAnnonce: number;

@IsNotEmpty()
@IsInt()
idUtilisateur: number;
}
