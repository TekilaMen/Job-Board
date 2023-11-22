// utilisateur.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany,JoinColumn } from 'typeorm';
import { Message } from '../Messages/message.entity';

@Entity()
export class Utilisateur {
@PrimaryGeneratedColumn()
id: number;

@Column({name :'Nom'})
nom: string;

@Column({name :'Prenom'})
prenom: string;

@Column({name :'Email'})
email: string;

@Column({name :'Login'})
login: string;

@Column({name :'Mdp'})
mdp: string;

@Column({name :'Role'})
role: string;

@OneToMany(() => Message, message => message.utilisateur)
@JoinColumn({ name: 'utilisateurId' })
messages: Message[];

}
