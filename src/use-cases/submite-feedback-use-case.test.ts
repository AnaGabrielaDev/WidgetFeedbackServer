import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()

const submiteFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy }, 
  { sendMail: sendMailSpy }
);

describe('Submite Feedback', () => {
  it('should be able to submite a feedback', async () => {
    await expect(submiteFeedback.execute({
      type: 'BUG',
      comment: 'Something...',
      screenshot: 'data:image/png;base64,asdasdasd'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submite a feedback without a type', async () => {
    await expect(submiteFeedback.execute({
      type: '',
      comment: 'Something...',
      screenshot: 'data:image/png;base64/asdasdasd'
    })).rejects.toThrow();
  });

  it('should not be able to submite a feedback without a comment', async () => {
    await expect(submiteFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64/asdasdasd'
    })).rejects.toThrow();
  });

  it('should not be able to submite a feedback with a invalid screenshot', async () => {
    await expect(submiteFeedback.execute({
      type: 'BUG',
      comment: 'Something...',
      screenshot: 'asdasd'
    })).rejects.toThrow();
  });
});

