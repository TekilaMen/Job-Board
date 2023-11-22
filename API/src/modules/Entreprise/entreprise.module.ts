// entreprise.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entreprise } from '../Entreprise/entreprise.entity';
import { EntrepriseController } from '../Entreprise/entreprise.controller';
import { EntrepriseService } from '../Entreprise/entreprise.service';

@Module({
imports: [TypeOrmModule.forFeature([Entreprise])],
controllers: [EntrepriseController],
providers: [EntrepriseService],
exports:[EntrepriseService],
})
export class EntrepriseModule {}
