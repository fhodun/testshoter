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

export const validateTestURL = (
  strURL: string,
): { url: URL; err?: undefined } | { err: Error } => {
  let url;
  try {
    url = new URL(strURL);
    if (url.host !== 'www.testportal.pl')
      throw new Error('Invalid test host, expected www.testportal.pl');
    if (url.hostname !== 'www.testportal.pl')
      throw new Error('Invalid test hostname, expected www.testportal.pl');
    if (url.origin !== 'https://www.testportal.pl')
      throw new Error(
        'Invalid test origin, expected https://www.testportal.pl',
      );
    if (url.pathname !== '/exam/LoadTestStart.html')
      throw new Error(
        'Invalid test pathname, expected /exam/LoadTestStart.html',
      );
    if (url.protocol !== 'https:')
      throw new Error('Invalid test protocol, expected https:');
    if (!url.search.startsWith('?t=') || url.search.length !== 15)
      throw new Error('Invalid test search params, expected ?t=xxxxxxxxxxxx');
  } catch (err) {
    return {
      err,
    };
  }
  return {
    url,
  };
};
