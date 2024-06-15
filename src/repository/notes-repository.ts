import { Notes } from "../types";

export class NotesRepository {
  static key: string = "organizer-notes";

  static getNotes(): Notes {
    const stored = window.localStorage.getItem(this.key);

    if (stored) return JSON.parse(stored);
    return [];
  }

  static setNotes(notes: Notes) {
    const valueToStore = JSON.stringify(notes);

    window.localStorage.setItem(this.key, valueToStore);
  }

  static resetNotes() {
    window.localStorage.removeItem(this.key);
  }
}
