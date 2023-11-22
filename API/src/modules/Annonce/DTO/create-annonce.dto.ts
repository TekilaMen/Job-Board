import {IsNotEmpty, IsString, MinLength, IsInt } from 'class-validator';

export class CreateAnnonceDto {

    @MinLength(2)
    @IsString()
    localisation: string;

    @MinLength(2)
    @IsString()
    poste: string;

    @MinLength(2)
    @IsString()
    commentaire: string;

    @MinLength(2)
    @IsString()
    horraires: string;
    
    @IsNotEmpty()
    @IsInt()
    Id_Entreprise: number;
}
