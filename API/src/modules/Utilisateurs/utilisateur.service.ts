// utilisateur.service.ts
import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from '../Utilisateurs/utilisateur.entity';
import { CreateUtilisateurDto } from './DTO/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './DTO/update-utilisateur.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UtilisateurService {
    constructor(
        @InjectRepository(Utilisateur)
        private readonly utilisateurRepository: Repository<Utilisateur>,
    ) {}

    //Get

    async findAll(): Promise<Utilisateur[]> {
        return this.utilisateurRepository.find();
    } 

    async findByUtilisteurId(id: number): Promise<Utilisateur | undefined> {
        return this.utilisateurRepository.findOne({ where: { id: Number(id) } });
    }

    async findUtilisateurLogin(id: number): Promise<string> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { id: Number(id) } });

        if (!utilisateur) {
            throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé(e)`);
        }
        return utilisateur.login;   
    }

    async findUtilisateurRole(id: number): Promise<string> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { id: Number(id) } });
        
        if (!utilisateur) {
            throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé(e)`);
        }
        return utilisateur.role;
    } 

    async findUtilisateurMdp(id: number): Promise<string> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { id: Number(id) } });
        
        if (!utilisateur) {
            throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé(e)`);
        }
        return utilisateur.mdp;
    } 

    async findUtilisateurEmail(id: number): Promise<string> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { id: Number(id) } });
        
        if (!utilisateur) {
            throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé(e)`);
        }
        return utilisateur.email;
    } 

    async findUtilisateurPrenom(id: number): Promise<string> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { id: Number(id) } });
        
        if (!utilisateur) {
            throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé(e)`);
        }
        return utilisateur.prenom;
    } 

    async findUtilisateur(id: number): Promise<Utilisateur> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { id: Number(id) } });
        
        if (!utilisateur) {
            throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé(e)`);
        }
        return utilisateur;
    } 

    async findUtilisateurByLogin(login: string): Promise<Utilisateur | undefined> {
        const user = await this.utilisateurRepository.findOne({ where: { login: String(login) } });
        return user;
    }

    async findUtilisateurIdByLogin(login: string): Promise<number> {
        const utilisateur = await this.utilisateurRepository.findOne({ where: { login: String(login) } });
        
        if (!utilisateur) {
            throw new NotFoundException(`Utilisateur avec le login ${login} non trouvé(e)`);
        }
        return utilisateur.id;
    }


    //Create

    async createUser(createUserDto: CreateUtilisateurDto): Promise<Utilisateur> {
        const user: Utilisateur = new Utilisateur();
        user.nom = createUserDto.nom;
        user.prenom = createUserDto.prenom;
        user.email = createUserDto.email;
        user.login = createUserDto.login;
        user.mdp = createUserDto.mdp;
        user.role = createUserDto.role;
        // Hacher le mot de passe avec bcrypt
        const saltRounds = 10; // Le nombre de tours de hachage
        const hashedPassword = await bcrypt.hash(createUserDto.mdp, saltRounds);
        user.mdp = hashedPassword;
    
        return this.utilisateurRepository.save(user);
    }


    //update


    async updateUser(id: number, updateUserDto: UpdateUtilisateurDto): Promise<Utilisateur | undefined> {
        const updateResult = await this.utilisateurRepository.update(id, updateUserDto);

        if (updateResult.affected > 0) {
          // Si l'update a réussi, récupérez l'utilisateur mis à jour directement depuis la base de données
            return this.utilisateurRepository.findOne({ where: { id } });
        } else {
            return undefined;
        }
    }

    //delete

    async deleteUser(id: number): Promise<Utilisateur | undefined> {
        const userToDelete = await this.utilisateurRepository.findOne({ where: { id } });
    
        if (!userToDelete) {
          return undefined; // Aucun utilisateur trouvé pour la suppression
        }
    
        return this.utilisateurRepository.remove(userToDelete);
    }

}

