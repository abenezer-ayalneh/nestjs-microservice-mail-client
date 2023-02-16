import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @MessagePattern({ cmd: 'sendMail' })
  sendMail() {
    return this.mailService.sendMail();
  }
}
