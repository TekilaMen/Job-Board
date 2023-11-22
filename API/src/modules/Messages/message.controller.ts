// message.controller.ts
import { Controller, Get,Post,Body,Put, Param,NotFoundException, ValidationPipe, Delete } from '@nestjs/common';
import { MessageService } from '../Messages/message.service';
import { CreateMessageDto } from './DTO/create-message.dto';
import { UpdateMessageDto } from './DTO/update-message.dto';
import { Message } from './message.entity'

@Controller('messages')
export class MessageController {
constructor(private readonly messageService: MessageService) {}

    @Get()
    async findAll(): Promise<Message[]> {
        return this.messageService.findAll();
}


    @Get(':id/all')
    findMessage(@Param('id') id: number) {
        return this.messageService.findMessage(id);
    }

    @Get(':id/annonce')
    findMessageIdAnnonce(@Param('id') id: number) {
        return this.messageService.findMessageIdAnnonce(id);
    }

    @Get(':id/utilisateur')
    findMessageIdUtilisateur(@Param('id') id: number) {
        return this.messageService.findMessageIdUtilisateur(id);
    }

    @Post()
    async createMessage(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
        return this.messageService.createMessage(createMessageDto);
    }

    @Put(':id')
    updateMessage(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto): Promise<Message> {
        return this.messageService.updateMessage(id, updateMessageDto);
    }

    @Delete(':id')
    async deleteMessage(@Param('id') id: number) {
    const deletedMessage = await this.messageService.deleteMessage(id);

    if (!deletedMessage) {
        throw new NotFoundException(`Message avec l'ID ${id} non trouvé(e)`);
    }

    return { message: 'Message supprimé avec succès' };
    }


}
