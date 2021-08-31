import isValidURL from '../../utils/isValidURL';

describe('Utils - isValidURL', () => {
  it('isValidURL() - shoudl return false', () => {
    expect(isValidURL('http:/google.com')).toBeFalsy();
    expect(isValidURL('https:/google.com')).toBeFalsy();
    expect(isValidURL('http://googlecom')).toBeFalsy();
    expect(isValidURL('google.com/images')).toBeFalsy();
  });

  it('isValidURL() - shoudl return true', () => {
    expect(isValidURL('http://google.com')).toBeTruthy();
    expect(
      isValidURL('https://google.com/static/images/dogs/doggies/image_1.png')
    ).toBeTruthy();
  });
});
