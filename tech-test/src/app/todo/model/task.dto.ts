export class Task {
  public id: number;
  public label: string;
  public done: boolean;

  constructor(id, label, done){
    this.id = id;
    this.label = label;
    this.done = done;
  }
}
