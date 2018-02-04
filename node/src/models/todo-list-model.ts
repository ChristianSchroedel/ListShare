import { IToDoList } from '../../../interfaces/todo-list';
import { Document, Schema, Model, model } from 'mongoose';

interface IToDoListModel extends IToDoList, Document { }

const schema = new Schema({
  title: { type: String, required: true },
  entries: []
});

export const ToDoListMongooseModel = model<IToDoListModel>('todoList', schema);

export class ToDoListModel {
  private static listModel: Model<IToDoListModel> = ToDoListMongooseModel;

  public static async create(payload: Partial<IToDoList> = {}): Promise<IToDoList> {
    const newList: IToDoListModel = {
      title: payload.title || 'New List',
      entries: payload.entries || []
    } as IToDoListModel;

    return this.listModel.create(newList);
  }

  public static async read(id?: string): Promise<IToDoList | IToDoList[] | null> {
    if (id) {
      return this.listModel.findById(id);
    }

    return this.listModel.find();
  }

  public static async update(id: string, payload: Partial<IToDoList>): Promise<IToDoList | null> {
    return this.listModel.findByIdAndUpdate(id, payload);
  }

  public static async delete(id: string): Promise<IToDoList | null> {
    return this.listModel.findByIdAndRemove(id);
  }
}
