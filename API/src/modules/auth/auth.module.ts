import { Module } from '@nestjs/common';
import { UtilisateurModule } from '../Utilisateurs/utilisateur.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UtilisateurService } from '../Utilisateurs/utilisateur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from '../Utilisateurs/utilisateur.entity';
import { LocalStrategyUser } from './local.strategy';
import { EntrepriseService } from '../Entreprise/entreprise.service';
import { EntrepriseModule } from '../Entreprise/entreprise.module';
import { Entreprise } from '../Entreprise/entreprise.entity';
import { LocalStrategyEntreprise } from './local.strategy';

@Module({
  imports: [
    UtilisateurModule,
    EntrepriseModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([Utilisateur, Entreprise]),
  ],
  providers: [AuthService, UtilisateurService,EntrepriseService, LocalStrategyUser, LocalStrategyEntreprise],
  controllers: [AuthController],
})
export class AuthModule {}
