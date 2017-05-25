import { Challenge1Page } from './app.po';

describe('challenge1 App', () => {
  let page: Challenge1Page;

  beforeEach(() => {
    page = new Challenge1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
