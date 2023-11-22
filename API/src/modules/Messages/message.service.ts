// message.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../Messages/message.entity';
import { Annonce } from '../Annonce/annonce.entity';
import { Utilisateur } from '../Utilisateurs/utilisateur.entity';
import { CreateMessageDto } from './DTO/create-message.dto';
import { UpdateMessageDto } from './DTO/update-message.dto';
import { AnnonceService } from '../Annonce/annonce.service';
import { UtilisateurService } from '../Utilisateurs/utilisateur.service';

@Injectable()
export class MessageService {
constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly annonceService: AnnonceService,
    private readonly utilisateurService: UtilisateurService,
) {}

    async findAll(): Promise<Message[]> {
        return this.messageRepository.find({
        relations: ['utilisateur', 'annonce'],
        });
    }

    async findMessage(id: number): Promise<Message> {
        const message = await this.messageRepository.findOne({ where: { id: Number(id) } });

        if (!message) {
            throw new NotFoundException(`Message avec l'ID ${id} non trouvé`);
        }

        return message;
    }

    async findMessageIdAnnonce(id: number): Promise<Annonce> {
        const message = await this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.utilisateur', 'utilisateur')
        .leftJoinAndSelect('message.annonce', 'annonce')
        .where('message.id = :id', { id })
        .getOne();

        if (!message) {
            throw new NotFoundException(`Message avec l'ID ${id} non trouvé`);
        }

        return message.annonce;
    }

    async findMessageIdUtilisateur(id: number): Promise<Utilisateur> {
        const message = await this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.utilisateur', 'utilisateur')
        .leftJoinAndSelect('message.annonce', 'annonce')
        .where('message.id = :id', { id })
        .getOne();

        if (!message) {
            throw new NotFoundException(`Message avec l'ID ${id} non trouvé`);
        }

        return message.utilisateur;
    }

    //Create
    async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        // Vérifier l'existence de l'annonce et de l'utilisateur
        const annonce = await this.annonceService.findByAnnonceId(createMessageDto.idAnnonce);
        const utilisateur = await this.utilisateurService.findByUtilisteurId(createMessageDto.idUtilisateur);
    
        if (!annonce || !utilisateur) {
            throw new NotFoundException('L\'annonce ou l\'utilisateur spécifié n\'existe pas.');
        }
    
        // Créer le message
        const message = new Message();
        message.contenue = createMessageDto.contenu;
        message.annonce = annonce;
        message.utilisateur = utilisateur;
        
        const savedMessage = await this.messageRepository.save(message);

        return savedMessage;
    }

    async updateMessage(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
        // Vérifiez si le message existe
        const message = await this.messageRepository.findOne({ where: { id: Number(id) } });
        if (!message) {
            throw new NotFoundException(`Message avec l'ID ${id} non trouvé`);
        }
    
        // Mettez à jour les champs nécessaires
        if (updateMessageDto.contenu) {
            message.contenue = updateMessageDto.contenu;
        }
    
        // Enregistrez les modifications
        return this.messageRepository.save(message);
    }

    async deleteMessage(id: number): Promise<Message | undefined> {
        const MessageToDelete = await this.messageRepository.findOne({ where: { id } });
    
        if (!MessageToDelete) {
          return undefined; // Aucun utilisateur trouvé pour la suppression
        }
    
        return this.messageRepository.remove(MessageToDelete);
    }

}
