import { ToDoListEntry } from './todo-list-entry';
import { Contact } from './contact';

export interface ToDoList {
  id: string;
  title: string;
  entries: ToDoListEntry[];
  sharedContacts: Contact[];
}
