// utilisateur.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany,JoinColumn } from 'typeorm';
import { Entreprise } from '../Entreprise/entreprise.entity';
import { Message } from '../Messages/message.entity';

@Entity()
export class Annonce {
@PrimaryGeneratedColumn()
id: number;

@Column()
localisation: string;

@Column()
poste: string;

@Column()
commentaire: string;

@Column()
horraires: string;

@ManyToOne(() => Entreprise, entreprise => entreprise.annonces)
@JoinColumn({ name: 'Id_entreprise' })
entreprise: Entreprise;

@OneToMany(() => Message, message => message.annonce)
messages: Message[];

}
