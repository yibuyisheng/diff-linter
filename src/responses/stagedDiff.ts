import * as createGit from 'simple-git/promise';
import Diff from './Diff';

export default async function stagedDiff(repoDir: string = process.cwd()) {
  const simpleGit = createGit(repoDir);
  const output = await simpleGit.diff(['--staged']);
  const d = new Diff();
  d.parse(output);
  return d;
}
