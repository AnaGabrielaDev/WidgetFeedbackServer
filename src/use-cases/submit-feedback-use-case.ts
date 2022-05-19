import { mailAdapter } from "../adapters/mail-adapters";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
     private feedbacksRepository: FeedbacksRepository,
     private mailAdapter: mailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const {type, comment, screenshot} = request;

    if(!type) throw new Error('type is required');
    if(!comment) throw new Error('comment is required');

    if(screenshot && !screenshot.startsWith('data:image/png;base64,')) throw new Error('Invalid screenshot format.');

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'New Feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Type of Feedback: ${type}</p>`,
        `<p>Comment: ${comment}</p>`
      ].join('\n')
    });
  }
}