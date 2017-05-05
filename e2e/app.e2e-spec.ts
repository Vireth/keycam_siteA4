import { KEYCAMSITEA4Page } from './app.po';

describe('keycam-sitea4 App', () => {
  let page: KEYCAMSITEA4Page;

  beforeEach(() => {
    page = new KEYCAMSITEA4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
