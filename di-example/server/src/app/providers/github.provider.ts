import { injectable } from 'inversify';
import { Octokit } from 'octokit';

@injectable()
export class GithubProvider {
    public client!: Octokit;

    constructor() {
        this.client = new Octokit({ auth: process.env.GITHUB_PAT, userAgent: process.env.GITHUB_DEFAULT_USER_AGENT });
    }
}
