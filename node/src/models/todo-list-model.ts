import * as fs from 'fs';
import * as path from 'path';

import { Model } from './model';
import { ToDoList } from './todo-list';

let instance: ToDoListModel | null = null;

export class ToDoListModel implements Model<ToDoList> {
  constructor() {
    if (!instance) {
      instance = this;
    } else {
      throw new Error('There is already an instance of ToDoListModel');
    }
  }

  public static get instance(): ToDoListModel {
    if (instance) {
      return instance;
    }

    return new ToDoListModel();
  }

  public async create(payload: Partial<ToDoList>): Promise<string> {
    const lists = await this.readToDoLists();

    const newList = payload as ToDoList;
    newList.id = `${+(lists[lists.length - 1].id) + 1}`;
    newList.title = payload.title ? payload.title : 'No Title';
    newList.entries = payload.entries ? payload.entries : [];
    newList.sharedContacts = payload.sharedContacts ? payload.sharedContacts : [];

    lists.push(newList);

    await this.writeToDoLists(lists);
    return Promise.resolve(newList.id);
  }

  public async read(id?: string): Promise<ToDoList | ToDoList[] | undefined> {
    const lists = await this.readToDoLists();

    if (id) {
      return Promise.resolve(lists.find(toDoList => toDoList.id === id));
    }

    return Promise.resolve(lists);
  }

  public async update(id: string, payload: Partial<ToDoList>): Promise<boolean> {
    const lists = await this.readToDoLists();

    const index = lists.findIndex(toDoList => toDoList.id === id);

    if (index < 0) {
      return Promise.resolve(false);
    }

    lists[index] = Object.assign({}, lists[index], payload);

    await this.writeToDoLists(lists);
    return Promise.resolve(true);
  }

  public async delete(id: string): Promise<boolean> {
    const lists = await this.readToDoLists();

    const index = lists.findIndex(toDoList => toDoList.id === id);

    if (index < 0) {
      return Promise.resolve(false);
    }

    lists.splice(index, 1);

    await this.writeToDoLists(lists);
    return Promise.resolve(true);
  }

  private readToDoLists(): Promise<ToDoList[]> {
    return new Promise<ToDoList[]>((resolve, reject) => {
      fs.readFile(path.resolve('./', 'todo-lists.json'), 'utf8', (err: Error, buffer: string) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(JSON.parse(buffer));
      });
    });
  }

  private writeToDoLists(lists: ToDoList[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(path.resolve('./', 'todo-lists.json'), JSON.stringify(lists), (err: Error) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
}
