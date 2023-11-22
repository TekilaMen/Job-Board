// message.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../Messages/message.entity';
import { MessageController } from '../Messages/message.controller';
import { MessageService } from '../Messages/message.service';   
import { AnnonceModule } from '../Annonce/annonce.module';
import { UtilisateurModule } from '../Utilisateurs/utilisateur.module';
import { AnnonceService } from '../Annonce/annonce.service';

@Module({
    imports: [AnnonceModule,TypeOrmModule.forFeature([Message]),UtilisateurModule],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService]
})
export class MessageModule {}
