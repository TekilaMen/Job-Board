// annonce.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annonce } from '../Annonce/annonce.entity';
import { AnnonceController } from '../Annonce/annonce.controller';
import { AnnonceService } from '../Annonce/annonce.service';
import { EntrepriseModule } from '../Entreprise/entreprise.module';


@Module({
imports: [TypeOrmModule.forFeature([Annonce]), EntrepriseModule],
controllers: [AnnonceController],
providers: [AnnonceService],
exports:[AnnonceService],
})
export class AnnonceModule {}