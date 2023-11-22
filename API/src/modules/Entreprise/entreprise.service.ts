// entreprise.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entreprise } from '../Entreprise/entreprise.entity';
import { CreateEntrepriseDto } from '../Entreprise/DTO/create-entreprise.dto';
import { UpdateEntrepriseDto } from '../Entreprise/DTO/update-entreprise.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EntrepriseService {
constructor(
    @InjectRepository(Entreprise)
    private readonly entrepriseRepository: Repository<Entreprise>,
) {}

    async findAll(): Promise<Entreprise[]> {
        return this.entrepriseRepository.find();
    } 

    async findById(id: number): Promise<Entreprise> {
    const entreprise = await this.entrepriseRepository.findOne({ where: { id: Number(id) } });

    if (!entreprise) {
        throw new NotFoundException(`Entreprise avec l'ID ${id} non trouvée`);
    }
    

        return entreprise;
    }

    async findByLogin(login: string): Promise<Entreprise | undefined> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { login: String(login) } });
    
        if (!entreprise) {
            throw new NotFoundException(`Entreprise avec le login ${login} non trouvée`);
        }
        
    
            return entreprise;
        }

    async findEntreprise(id: number): Promise<Entreprise> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { id: Number(id) } });

        if (!entreprise) {
            throw new NotFoundException(`Entreprise avec l'ID ${id} non trouvée`);
        }

        return entreprise;
    }

    async findEntrepriseNom(id: number): Promise<string> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { id: Number(id) } });
        
        if (!entreprise) {
            throw new NotFoundException(`Entreprise avec l'ID ${id} non trouvé(e)`);
        }
        return entreprise.nom;
    } 

    async findEntrepriseLocalistation(id: number): Promise<string> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { id: Number(id) } });
        
        if (!entreprise) {
            throw new NotFoundException(`Entreprise avec l'ID ${id} non trouvé(e)`);
        }
        return entreprise.localisation;
    } 

    async findEntrepriseEmail(id: number): Promise<string> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { id: Number(id) } });
        
        if (!entreprise) {
            throw new NotFoundException(`Entreprise avec l'ID ${id} non trouvé(e)`);
        }
        return entreprise.email;
    } 

    async findEntrepriseLogin(id: number): Promise<string> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { id: Number(id) } });
        
        if (!entreprise) {
            throw new NotFoundException(`Entreprise avec l'ID ${id} non trouvé(e)`);
        }
        return entreprise.login;
    } 

    async findEntrepriseMdp(id: number): Promise<string> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { id: Number(id) } });
        
        if (!entreprise) {
            throw new NotFoundException(`Entreprise avec l'ID ${id} non trouvé(e)`);
        }
        return entreprise.mdp;
    } 

    //create

    async createEntreprise(createEntrepriseDto: CreateEntrepriseDto): Promise<Entreprise> {
        const entreprise: Entreprise = new Entreprise();
        entreprise.nom = createEntrepriseDto.nom;
        entreprise.localisation = createEntrepriseDto.localisation;
        entreprise.email = createEntrepriseDto.email;
        entreprise.login = createEntrepriseDto.login;
        entreprise.mdp = createEntrepriseDto.mdp;
        // Hacher le mot de passe avec bcrypt
        const saltRounds = 10; // Le nombre de tours de hachage
        const hashedPassword = await bcrypt.hash(createEntrepriseDto.mdp, saltRounds);
        entreprise.mdp = hashedPassword;
    
        return this.entrepriseRepository.save(entreprise);
    }

    async updateEntrepsie(id: number, updateEntrepriseDto: UpdateEntrepriseDto): Promise<Entreprise | undefined> {
        // Logique de mise à jour de l'entrpeirse avec le DTO
        const updateResult = await this.entrepriseRepository.update(id, updateEntrepriseDto);

        if (updateResult.affected > 0) {
          // Si l'update a réussi, récupérez l'entreprise mis à jour 
            return this.entrepriseRepository.findOne({ where: { id } });
        } else {
            return undefined;
        }
    }

    async deleteEntreprise(id: number): Promise<Entreprise | undefined> {
        const entrepriseToDelete = await this.entrepriseRepository.findOne({ where: { id } });
    
        if (!entrepriseToDelete) {
          return undefined; // Aucune entreprise trouvé pour la suppression
        }
    
        return this.entrepriseRepository.remove(entrepriseToDelete);
    }
}
