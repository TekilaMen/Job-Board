// annonce.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { AnnonceService } from '../Annonce/annonce.service';
import { CreateAnnonceDto } from './DTO/create-annonce.dto';
import { Annonce } from './annonce.entity';
import { UpdateAnnonceDto } from './DTO/update-annonce.dto';

@Controller('annonces')
export class AnnonceController {
constructor(private readonly annonceService: AnnonceService) {}

    @Get()
    async findAll(): Promise<Annonce[]> {
        return this.annonceService.findAll();
    }

    @Get(':id/all')
    findAnnonce(@Param('id') id: number) {
        return this.annonceService.findAnnonce(id);
    }

    @Get(':id/localisation')
    findAnnonceLocalisation(@Param('id') id: number) {
        return this.annonceService.findAnnonceLocalisation(id);
}

    @Get(':id/poste')
    findAnnoncePoste(@Param('id') id: number) {
        return this.annonceService.findAnnoncePoste(id);
    }

    @Get(':id/commentaire')
    findAnnonceCommentaire(@Param('id') id: number) {
        return this.annonceService.findAnnonceCommentaire(id);
    }

    @Get(':id/horraires')
    findAnnonceHorraires(@Param('id') id: number) {
        return this.annonceService.findAnnonceHorraires(id);
    }

    @Get(':id/entreprise')
    findAnnonceEntreprise(@Param('id') id: number) {
        return this.annonceService.findAnnonceEntreprise(id);
    }


    @Post()
        createAnnonce(@Body() createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        return this.annonceService.createAnnonce(createAnnonceDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateAnnonceDto: UpdateAnnonceDto) {

    const updatedAnnonce = await this.annonceService.update(id, updateAnnonceDto);

    return updatedAnnonce;


    }   

    @Delete(':id')
    async deleteAnnonce(@Param('id') id: number) {
    const deletedAnnonce = await this.annonceService.deleteAnnonce(id);

    if (!deletedAnnonce) {
        throw new NotFoundException(`Annonce avec l'ID ${id} non trouvé(e)`);
    }

    return { message: 'Annonce supprimé avec succès' };
    }
}

