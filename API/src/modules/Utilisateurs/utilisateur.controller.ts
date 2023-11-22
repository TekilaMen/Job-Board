// utilisateur.controller.ts
import { Controller, Get, Put, Delete , Param, Post, Body, ValidationPipe, NotFoundException } from '@nestjs/common';
import { UtilisateurService } from '../Utilisateurs/utilisateur.service';
import { Utilisateur } from './utilisateur.entity';
import { CreateUtilisateurDto } from './DTO/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './DTO/update-utilisateur.dto';

@Controller('utilisateurs')
export class UtilisateurController {
constructor(private readonly utilisateurService: UtilisateurService) {}

    @Get()
    async findAll(): Promise<Utilisateur[]> {
        return this.utilisateurService.findAll();
    }

    @Get(':id/role')
    findUtilisateurRole(@Param('id') id: number) {
        const role = this.utilisateurService.findUtilisateurRole(id);
        return role;
    }

    @Get(':id/login')
    findUtilisateurLogin(@Param('id') id: number) {
        const login = this.utilisateurService.findUtilisateurLogin(id);
        return login;
    }

    @Get(':id/mdp')
    findUtilisateurMdp(@Param('id') id: number) {
        const mdp = this.utilisateurService.findUtilisateurMdp(id);
        return mdp;
    }

    @Get(':id/email')
    findUtilisateurEmail(@Param('id') id: number) {
        const email = this.utilisateurService.findUtilisateurEmail(id);
        return email;
    }

    @Get(':id/prenom')
    findUtilisateurPrenom(@Param('id') id: number) {
        const prenom = this.utilisateurService.findUtilisateurPrenom(id);
        return prenom;
    }

    @Get(':id/all')
    findUtilisateur(@Param('id') id: number) {
        const all = this.utilisateurService.findUtilisateur(id);
        return all;
    }

    @Get(':login')
    findUtilisateurByLogin(@Param('login') login: string) {
        const all = this.utilisateurService.findUtilisateurByLogin(login);
        return all;
    }

    @Get(':login/id')
    findUtilisateurIdByLogin(@Param('login') login: string) {
        const id = this.utilisateurService.findUtilisateurIdByLogin(login);
        return id;
    }


    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUtilisateurDto) {
        const updatedUser = this.utilisateurService.updateUser(id, updateUserDto);
        if (!updatedUser) {
            throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
        }
        return updatedUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
    const deletedUser = await this.utilisateurService.deleteUser(id);

    if (!deletedUser) {
        throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé(e)`);
    }

    return { message: 'Utilisateur supprimé avec succès' };
    }

    @Post()
    create(@Body() createUserDto: CreateUtilisateurDto) {
        return this.utilisateurService.createUser(createUserDto);
    }
}




