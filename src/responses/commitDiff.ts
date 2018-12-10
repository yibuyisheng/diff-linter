import * as createGit from 'simple-git/promise';
import Diff from './Diff';

export default async function commitDiff(
  baseCommitId: string,
  targetCommitId: string,
  repoDir: string = process.cwd(),
) {
  const simpleGit = createGit(repoDir);
  const output = await simpleGit.diff([`${baseCommitId}^..${targetCommitId}`]);
  const d = new Diff();
  d.parse(output);
  return d;
}
