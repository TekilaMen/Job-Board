import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class CreateUtilisateurDto {
@MinLength(2)
@IsString()
nom: string;

@MinLength(2)
@IsString()
prenom: string;

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

@MinLength(2)
@IsString()
role: string;

}
