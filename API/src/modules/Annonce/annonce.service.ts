// annonce.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from '../Annonce/annonce.entity';
import { Entreprise } from '../Entreprise/entreprise.entity';
import { CreateAnnonceDto } from './DTO/create-annonce.dto';
import { UpdateAnnonceDto } from './DTO/update-annonce.dto';
import { EntrepriseService } from '../Entreprise/entreprise.service';


@Injectable()
export class AnnonceService {
constructor(
    @InjectRepository(Annonce)
    private readonly annonceRepository: Repository<Annonce>,
    private readonly entrepriseService: EntrepriseService,
) {}

    async findAll(): Promise<Annonce[]> {
        return this.annonceRepository.find({
            relations: ['entreprise'],
            }
        );
    }

    async findByAnnonceId(id: number): Promise<Annonce | undefined> {
        return this.annonceRepository.findOne({ where: { id: Number(id) } });
    }

    async findAnnonce(id: number): Promise<Annonce> {
        const annonce = await this.annonceRepository.findOne({ where: { id: Number(id) } });

        if (!annonce) {
            throw new NotFoundException(`Annonce avec l'ID ${id} non trouvée`);
        }

        return annonce;
    }

    async findAnnonceLocalisation(id: number): Promise<string> {
        const annonce = await this.annonceRepository.findOne({ where: { id: Number(id) } });

        if (!annonce) {
            throw new NotFoundException(`Annonce avec l'ID ${id} non trouvée`);
        }

        return annonce.localisation;
    }

    async findAnnoncePoste(id: number): Promise<string> {
        const annonce = await this.annonceRepository.findOne({ where: { id: Number(id) } });

        if (!annonce) {
            throw new NotFoundException(`Annonce avec l'ID ${id} non trouvée`);
        }

        return annonce.poste;
    }

    async findAnnonceCommentaire(id: number): Promise<string> {
        const annonce = await this.annonceRepository.findOne({ where: { id: Number(id) } });

        if (!annonce) {
            throw new NotFoundException(`Annonce avec l'ID ${id} non trouvée`);
        }

        return annonce.commentaire;
    }

    async findAnnonceHorraires(id: number): Promise<string> {
        const annonce = await this.annonceRepository.findOne({ where: { id: Number(id) } });

        if (!annonce) {
            throw new NotFoundException(`Annonce avec l'ID ${id} non trouvée`);
        }

        return annonce.horraires;
    }

    async findAnnonceEntreprise(id: number): Promise<Entreprise> {
        const annonce = await this.annonceRepository
        .createQueryBuilder('annonce')
        .leftJoinAndSelect('annonce.entreprise', 'entreprise')
        .where('annonce.id = :id', { id })
        .getOne();

        if (!annonce) {
            throw new NotFoundException(`Annonce avec l'ID ${id} non trouvé`);
        }

        return annonce.entreprise;
    }

    async createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        // Vérifie si l'entreprise associée existe
        const entreprise = await this.entrepriseService.findById(createAnnonceDto.Id_Entreprise);
        if (!entreprise) {
            throw new NotFoundException(`Entreprise avec l'ID ${createAnnonceDto.Id_Entreprise} non trouvée`);
        }
        

        // Créez l'annonce
        const annonce = new Annonce();
        annonce.localisation = createAnnonceDto.localisation;
        annonce.poste = createAnnonceDto.poste;
        annonce.commentaire = createAnnonceDto.commentaire;
        annonce.horraires = createAnnonceDto.horraires;
        annonce.entreprise = entreprise;
    

        const savedAnnonce = await this.annonceRepository.save(annonce);

        return savedAnnonce;
    }

    async update(id: number, updateAnnonceDto: UpdateAnnonceDto): Promise<Annonce> {
        const annonce = await this.annonceRepository.findOne({ where: { id: Number(id) } });
    
        if (!annonce) {
            throw new NotFoundException(`Annonce avec l'ID ${id} non trouvée`);
        }
    
        // Appliquer les mises à jour en fonction des champs non vides dans le DTO.
        if (updateAnnonceDto.localisation !== undefined) {
            annonce.localisation = updateAnnonceDto.localisation;
        }
    
        if (updateAnnonceDto.poste !== undefined) {
            annonce.poste = updateAnnonceDto.poste;
        }
    
        if (updateAnnonceDto.commentaire !== undefined) {
            annonce.commentaire = updateAnnonceDto.commentaire;
        }
    
        if (updateAnnonceDto.horraires !== undefined) {
            annonce.horraires = updateAnnonceDto.horraires;
        }
    
        return this.annonceRepository.save(annonce);
        }

        async deleteAnnonce(id: number): Promise<Annonce | undefined> {
            const AnnonceToDelete = await this.annonceRepository.findOne({ where: { id } });
        
            if (!AnnonceToDelete) {
              return undefined; // Aucune annonce trouvé pour la suppression
            }
        
            return this.annonceRepository.remove(AnnonceToDelete);
        }
}

