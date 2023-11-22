import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class CreateEntrepriseDto {
    @MinLength(2)
    @IsString()
    nom: string;
    
    @MinLength(2)
    @IsString()
    localisation: string;
    
    @MinLength(2)
    @IsEmail()
    email: string;
    
    @MinLength(2)
    @IsString()
    login: string;
    
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password needs at least 1 number, one lower case and one uppercase',
    })
    mdp: string;
    
}