import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Annonce } from '../Annonce/annonce.entity';
import { Utilisateur } from '../Utilisateurs/utilisateur.entity';

@Entity()
export class Message {
@PrimaryGeneratedColumn()
id: number;

@Column({name :'contenue'})
contenue: string;

@ManyToOne(() => Annonce, annonce => annonce.messages)
@JoinColumn({ name: 'annonceId' })
annonce: Annonce;

@ManyToOne(() => Utilisateur, utilisateur => utilisateur.messages)
@JoinColumn({ name: 'utilisateurId' })
utilisateur: Utilisateur;
}
