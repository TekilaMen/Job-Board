// entreprise.controller.ts
import { Controller,NotFoundException, Get, Param, Body,ValidationPipe, Post, Put, Delete } from '@nestjs/common';
import { EntrepriseService } from '../Entreprise/entreprise.service';
import { CreateEntrepriseDto } from '../Entreprise/DTO/create-entreprise.dto';
import { UpdateEntrepriseDto } from './DTO/update-entreprise.dto';
import { Entreprise } from './entreprise.entity';

@Controller('entreprises')
export class EntrepriseController {
constructor(private readonly entrepriseService: EntrepriseService) {}


    @Get()
    async findAll(): Promise<Entreprise[]> {
        return this.entrepriseService.findAll();
    }
    
    @Get(':login')
    findUtilisateurByLogin(@Param('login') login: string) {
        const all = this.entrepriseService.findByLogin(login);
        return all;
    }

    @Get(':id/all')
        findEntreprise(@Param('id') id: number) {
            const all = this.entrepriseService.findEntreprise(id);
            return all;
    }

    @Get(':id/nom')
        findEntrepriseNom(@Param('id') id: number) {
            const nom = this.entrepriseService.findEntrepriseNom(id);
            return nom;
    }

    @Get(':id/localisation')
    findEntrepriseLocalisation(@Param('id') id: number) {
        const Loc = this.entrepriseService.findEntrepriseLocalistation(id);
        return Loc;
    }

    @Get(':id/email')
    findEntrepriseEmail(@Param('id') id: number) {
        const email = this.entrepriseService.findEntrepriseEmail(id);
        return email;
    }

    @Get(':id/login')
    findEntrepriseLogin(@Param('id') id: number) {
        const login = this.entrepriseService.findEntrepriseLogin(id);
        return login;
    }

    @Get(':id/mdp')
    findEntrepriseMdp(@Param('id') id: number) {
        const mdp = this.entrepriseService.findEntrepriseMdp(id);
        return mdp;
    }

    @Post()
    create(@Body() createEntrepriseDto: CreateEntrepriseDto) {
        return this.entrepriseService.createEntreprise(createEntrepriseDto);
    }

    @Put(':id')
        updateUser(@Param('id') id: number, @Body() updateEntrepriseDto: UpdateEntrepriseDto) {
            const updatedUser = this.entrepriseService.updateEntrepsie(id, updateEntrepriseDto);
            if (!updatedUser) {
                throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
            }
            return updatedUser;
        }

    @Delete(':id')
        async deleteEntreprise(@Param('id') id: number) {
            const deletedEntreprise = await this.entrepriseService.deleteEntreprise(id);

            if (!deletedEntreprise) {
            throw new NotFoundException(`Entreprise avec l'ID ${id} non trouvé(e)`);
            }

            return { message: 'Entreprise supprimé avec succès' };
        }
}
