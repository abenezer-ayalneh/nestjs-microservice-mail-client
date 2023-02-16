import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectQueue('mail-queue') private mailQueue: Queue,
  ) {}

  async sendMail() {
    const queueAddResult = await this.mailQueue.add({
      to: 'jane.doe@ablaze.labs',
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Ablaze Labs',
      template: './hello', // `.hbs` extension is appended automatically
      //   context: {
      //     // ✏️ filling curly brackets with content
      //     name: user.name,
      //     url,
      //   },
    });

    console.log(await queueAddResult.isCompleted);

    if (queueAddResult.isCompleted) {
      return { statusCode: '200', message: 'Mail added to queue' };
    } else if (queueAddResult.isFailed) {
      return { statusCode: '500', message: 'Mail queue adding failed' };
    }
  }
}
