import { PartialType } from '@nestjs/mapped-types';
import { CreateEntrepriseDto } from './create-entreprise.dto';

export class UpdateEntrepriseDto extends PartialType(CreateEntrepriseDto) {}