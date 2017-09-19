import { FormBuilderPage } from './app.po';

describe('form-builder App', () => {
  let page: FormBuilderPage;

  beforeEach(() => {
    page = new FormBuilderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
