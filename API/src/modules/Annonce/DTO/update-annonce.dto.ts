import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAnnonceDto {
    @IsOptional()
    @IsNotEmpty()
    localisation?: string;

    @IsOptional()
    @IsNotEmpty()
    poste?: string;

    @IsOptional()
    @IsNotEmpty()
    commentaire?: string;

    @IsOptional()
    @IsNotEmpty()
    horraires?: string;


}
