export class NotesRepository {
  static key: string = "organizer-notes";

  static getNotes(): string[] {
    const stored = window.localStorage.getItem(this.key);

    if (stored) return JSON.parse(stored);
    return [];
  }

  static setNotes(notes: string[]) {
    const valueToStore = JSON.stringify(notes);

    window.localStorage.setItem(this.key, valueToStore);
  }

  static resetNotes() {
    window.localStorage.removeItem(this.key);
  }
}
