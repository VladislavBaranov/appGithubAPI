export interface GithubIssue {
  created_at: string;
  number: string;
  title: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  body: string;
}
