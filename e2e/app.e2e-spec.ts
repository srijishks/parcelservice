import { ParcelservicePage } from './app.po';

describe('parcelservice App', () => {
  let page: ParcelservicePage;

  beforeEach(() => {
    page = new ParcelservicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
