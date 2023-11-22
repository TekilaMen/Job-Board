// utilisateur.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from '../Utilisateurs/utilisateur.entity';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from '../Utilisateurs/utilisateur.service';

@Module({
    imports: [TypeOrmModule.forFeature([Utilisateur])],
    controllers: [UtilisateurController],
    providers: [UtilisateurService],
    exports: [UtilisateurService],
})
export class UtilisateurModule {}
