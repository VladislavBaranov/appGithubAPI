export class Issues {
  constructor(
    public title: string,
    public number: string,
    public login: string,
    public avatat_url: string,
    public created_at: string
  ) { }

}

export class Repo {
  constructor(
    public name: string
  ) { }
}
