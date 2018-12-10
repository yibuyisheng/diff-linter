import * as createGit from 'simple-git/promise';
import Diff from './Diff';

export default async function branchDiff(
  baseBranchName: string,
  targetBranchName: string,
  repoDir: string = process.cwd(),
) {
  const simpleGit = createGit(repoDir);
  const output = await simpleGit.diff([`${baseBranchName}^..${targetBranchName}`]);
  const d = new Diff();
  d.parse(output);
  return d;
}
