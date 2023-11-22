// utilisateur.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Annonce } from '../Annonce/annonce.entity';

@Entity()
export class Entreprise {
@PrimaryGeneratedColumn()
id: number;

@Column({name :'Nom'})
nom: string;

@Column({name :'Localisation'})
localisation: string;

@Column({name :'Email'})
email: string;

@Column({name :'Login'})
login: string;

@Column({name :'Mdp'})
mdp: string;

@OneToMany(() => Annonce, annonce => annonce.entreprise)
annonces: Annonce[];
}
