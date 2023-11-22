import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UtilisateurService } from '../Utilisateurs/utilisateur.service';
import { EntrepriseService } from '../Entreprise/entreprise.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UtilisateurService,
    private readonly entrepriseService: EntrepriseService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUtilisateurByLogin(username);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.mdp);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    // Remove the 'password' field from the user object
    const { mdp: userPassword, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }


  async validateEntreprise(username: string, password: string): Promise<any> {
    const entreprise = await this.entrepriseService.findByLogin(username);

    if (!entreprise) {
      throw new UnauthorizedException("Company not found");
    }

    const isPasswordValid = await bcrypt.compare(password, entreprise.mdp);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    // Remove the 'password' field from the company object
    const { mdp: userPassword, ...EntrepriseWithoutPassword } = entreprise;

    return EntrepriseWithoutPassword;
  }

  async login(user: any, userType: string) {
    const payload = { username: user.username, sub: user.id, userType };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
