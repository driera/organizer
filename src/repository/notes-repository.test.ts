import { NotesRepository } from "./notes-repository";

describe("NotesRepository", () => {
  it("saves notes", () => {
    jest.spyOn(window.localStorage.__proto__, "setItem");

    NotesRepository.setNotes([{ message: "Hello, World!", dueDate: "today" }]);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "organizer-notes",
      '[{"message":"Hello, World!","dueDate":"today"}]'
    );
  });

  it("extracts notes", () => {
    jest.spyOn(window.localStorage.__proto__, "getItem");
    NotesRepository.setNotes([{ message: "Hello, World!", dueDate: "today" }]);

    const notes = NotesRepository.getNotes();

    expect(window.localStorage.getItem).toHaveBeenCalledWith("organizer-notes");
    expect(notes).toEqual([{ message: "Hello, World!", dueDate: "today" }]);
  });

  it("reset notes", () => {
    jest.spyOn(window.localStorage.__proto__, "removeItem");
    NotesRepository.setNotes([{ message: "Hello, World!", dueDate: "today" }]);

    NotesRepository.resetNotes();

    expect(window.localStorage.removeItem).toHaveBeenCalledWith(
      "organizer-notes"
    );
    const notes = NotesRepository.getNotes();
    expect(notes).toEqual([]);
  });
});
