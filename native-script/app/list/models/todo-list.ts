import { ToDoListApiService } from '../services/todo-list-api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class ToDoList {
  private title$$: BehaviorSubject<string>;
  private entries$$: BehaviorSubject<any[]>;

  constructor(private apiService: ToDoListApiService,
              public readonly id: string,
              entries: any[],
              title: string) {
    this.title$$ = new BehaviorSubject(title);
    this.entries$$ = new BehaviorSubject(entries || []);
  }

  public get title$(): Observable<string> {
    return this.title$$;
  }

  public get entries$(): Observable<any[]> {
    return this.entries$$;
  }

  public addEntry(name: string, description?: string) {
    const currentEntries = this.entries$$.getValue();
    const newEntryId = `${Date.now()}`;

    currentEntries.push({
      id: newEntryId,
      name: name,
      description: description
    });

    this.entries$$.next(currentEntries);

    this.apiService.updateToDoListEntries(this.id, currentEntries)
      .subscribe(res => console.log(res));
  }

  public setEntryDone(entryId: string, done: boolean) {
    const currentEntries = this.entries$$.getValue();
    const entryForId = currentEntries.find(entry => entry.id === entryId);

    if (!entryForId) {
      console.error(`Cannot match any entry for id ${entryId}`);
      return;
    }

    entryForId.done = done;

    this.entries$$.next(currentEntries);
    
    this.apiService.updateToDoListEntries(this.id, currentEntries)
      .subscribe(res => console.log(res));
  }

  public deleteEntry(entryId: string) {
    const currentEntries = this.entries$$.getValue();
    const entryIndex = currentEntries.findIndex(entry => entry.id === entryId);
  
    if (entryIndex < 0) {
      console.error(`Cannot match any entry for id ${entryId}`);
      return;
    }

    currentEntries.splice(entryIndex, 1);

    this.entries$$.next(currentEntries);

    this.apiService.updateToDoListEntries(this.id, currentEntries)
      .subscribe(res => console.log(res));
  }
}
