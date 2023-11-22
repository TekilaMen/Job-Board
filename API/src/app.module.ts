import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './modules/Utilisateurs/utilisateur.module';
import { AnnonceModule } from './modules/Annonce/annonce.module';
import { EntrepriseModule } from './modules/Entreprise/entreprise.module';
import { MessageModule } from './modules/Messages/message.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'job_board',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UtilisateurModule,
    EntrepriseModule, 
    AnnonceModule, 
    MessageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

