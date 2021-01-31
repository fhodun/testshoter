import fetch from 'node-fetch';

export const checkNewestVersion = async (): Promise<string> => {
  const res = await fetch(
    'https://api.github.com/repos/fhodun/testshoter/releases/latest',
  );
  const json = await res.json();
  const version = json.tag_name;
  if (!version) throw new Error('Unable to get newest version');
  return json.tag_name;
};

export interface TestURL {
  url: URL;
  testID: string;
  err?: undefined;
}

export const validateTestURL = (strURL: string): TestURL | { err: Error } => {
  let url: URL;
  try {
    url = new URL(strURL);
    const testID = url.searchParams.get('t');
    if (!testID) throw new Error('URL does not contain `t` search param');
  } catch (err) {
    return {
      err,
    };
  }
  return {
    url,
    // assertion here bcs im sure that won't be null
    testID: url.searchParams.get('t') as string,
  };
};
