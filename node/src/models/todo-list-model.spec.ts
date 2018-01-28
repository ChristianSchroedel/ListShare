import { ToDoListModel } from './todo-list-model';
import { expect } from 'chai';

describe('ToDoListModel', () => {
  it('should only create one instance', () => {
    const instance = ToDoListModel.instance;
    const otherInstance = ToDoListModel.instance;

    expect(instance).to.equal(otherInstance);
  });
});
