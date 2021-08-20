
export class Task {
  public id: number;
  public label: string;
  public description:  string;
  public category: Category;
  public done: boolean | Date; // false | "22-10-2019"

  constructor(id, label, description, category, done){
    this.id = id;
    this.label = label;
    this.description = description;
    this.category = category;
    this.done = done;
  }
}

export enum Category { // values capitalised for display, saving conversion
  house = 'House',
  bureaucracy = 'Bureaucracy'
}
