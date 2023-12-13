import isEmail from './isEmail';

describe('isEmail', () => {
  it.each([
    // valid
    'foo@bar.com',
    'x@x.au',
    'foo@bar.com.au',
    'foo+bar@bar.com',
    'test123+ext@gmail.com',
    'some.name.midd.leNa.me.and.locality+extension@GoogleMail.com',
    `${'a'.repeat(64)}@${'a'.repeat(63)}.com`,
    `${'a'.repeat(64)}@${'a'.repeat(63)}.com`,
    `${'a'.repeat(31)}@gmail.com`,
    'test@gmail.com',
    'test.1@gmail.com',
    'test@1337.com',
  ])('returns true for email address %s', (email) => {
    expect(isEmail(email)).toBe(true);
  });

  it.each([
    undefined,
    true,
    [],
    {},
    'invalidemail@',
    'invalid.com',
    '@invalid.com',
    'foo@bar.com.',
    'foo@_bar.com',
    'somename@ｇｍａｉｌ.com',
    'foo@bar.co.uk.',
    'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
    `${'a'.repeat(64)}@${'a'.repeat(251)}.com`,
    `${'a'.repeat(65)}@${'a'.repeat(250)}.com`,
    `${'a'.repeat(64)}@${'a'.repeat(64)}.com`,
    'test1@invalid.co m',
    'test2@invalid.co m',
    'test3@invalid.co m',
    'test4@invalid.co m',
    'test5@invalid.co m',
    'test6@invalid.co m',
    'test7@invalid.co m',
    'test8@invalid.co m',
    'test9@invalid.co m',
    'test10@invalid.co m',
    'test11@invalid.co m',
    'test12@invalid.co　m',
    'test13@invalid.co　m',
    'test123+invalid! sub_address@gmail.com',
    'wrong()[]",:;<>@@gmail.com',
    '"wrong()[]",:;<>@@gmail.com',
    'username@domain.com�',
    'username@domain.com©',
    'nbsp test@test.com',
    'nbsp_test@te st.com',
    'nbsp_test@test.co m',
  ])('returns false for email address %s', (email) => {
    expect(isEmail(email)).toBe(false);
  });
});
