import { NotesRepository } from "./notes-repository";

describe("NotesRepository", () => {
  it("saves notes", () => {
    jest.spyOn(window.localStorage.__proto__, "setItem");

    NotesRepository.setNotes(["Hello, World!"]);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "organizer-notes",
      '["Hello, World!"]'
    );
  });

  it("extracts notes", () => {
    jest.spyOn(window.localStorage.__proto__, "getItem");
    NotesRepository.setNotes(["Hello, World!"]);

    const notes = NotesRepository.getNotes();

    expect(window.localStorage.getItem).toHaveBeenCalledWith("organizer-notes");
    expect(notes).toEqual(["Hello, World!"]);
  });

  it("reset notes", () => {
    jest.spyOn(window.localStorage.__proto__, "removeItem");
    NotesRepository.setNotes(["Hello, World!"]);

    NotesRepository.resetNotes();

    expect(window.localStorage.removeItem).toHaveBeenCalledWith(
      "organizer-notes"
    );
    const notes = NotesRepository.getNotes();
    expect(notes).toEqual([]);
  });
});
