export interface IToDoListEntry {
  name: string;
  description?: string;
  done: boolean;
}

export interface IToDoList {
  id?: any | string | number,
  title: string;
  entries: IToDoListEntry[];
}
