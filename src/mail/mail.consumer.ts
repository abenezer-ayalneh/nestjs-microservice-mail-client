import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('mail-queue')
export class MailConsumer {
  constructor(private mailerService: MailerService) {}

  @Process()
  async transcode(job: Job<ISendMailOptions>) {
    const result = await this.mailerService.sendMail(job.data);

    return result;
  }
}
