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
