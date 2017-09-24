import { McCheckinPage } from './app.po';

describe('mc-checkin App', () => {
  let page: McCheckinPage;

  beforeEach(() => {
    page = new McCheckinPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
