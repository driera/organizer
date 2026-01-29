import { renderHook, act } from "@testing-library/react";
import { useNotes } from "./useNotes";
import { NotesRepository } from "./repository/notes-repository";

describe("useNotes", () => {
  let getNotesSpy: jest.SpyInstance;
  let setNotesSpy: jest.SpyInstance;

  beforeEach(() => {
    getNotesSpy = jest.spyOn(NotesRepository, "getNotes");
    setNotesSpy = jest.spyOn(NotesRepository, "setNotes");
    getNotesSpy.mockReturnValue([]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("updateNoteDueDate", () => {
    it("updates the due date of a note at the specified index", () => {
      const initialNotes = [
        { message: "Note 1", dueDate: "today" },
        { message: "Note 2", dueDate: "today" },
        { message: "Note 3", dueDate: "today" }
      ];
      getNotesSpy.mockReturnValue(initialNotes);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(1, "some day");
      });

      expect(result.current.notes[1].dueDate).toBe("some day");
    });

    it("does not affect other notes when updating one note", () => {
      const initialNotes = [
        { message: "Note 1", dueDate: "today" },
        { message: "Note 2", dueDate: "today" },
        { message: "Note 3", dueDate: "today" }
      ];
      getNotesSpy.mockReturnValue(initialNotes);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(1, "some day");
      });

      expect(result.current.notes[0].dueDate).toBe("today");
      expect(result.current.notes[1].dueDate).toBe("some day");
      expect(result.current.notes[2].dueDate).toBe("today");
    });

    it("persists changes to localStorage via NotesRepository", () => {
      const initialNotes = [
        { message: "Note 1", dueDate: "today" },
        { message: "Note 2", dueDate: "today" }
      ];
      getNotesSpy.mockReturnValue(initialNotes);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(0, "some day");
      });

      expect(setNotesSpy).toHaveBeenCalledWith([
        { message: "Note 1", dueDate: "some day" },
        { message: "Note 2", dueDate: "today" }
      ]);
    });

    it("handles invalid index gracefully (negative index)", () => {
      const initialNotes = [{ message: "Note 1", dueDate: "today" }];
      getNotesSpy.mockReturnValue(initialNotes);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(-1, "some day");
      });

      expect(result.current.notes).toEqual(initialNotes);
    });

    it("handles invalid index gracefully (index out of bounds)", () => {
      const initialNotes = [{ message: "Note 1", dueDate: "today" }];
      getNotesSpy.mockReturnValue(initialNotes);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(5, "some day");
      });

      expect(result.current.notes).toEqual(initialNotes);
    });

    it("handles empty notes array", () => {
      getNotesSpy.mockReturnValue([]);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(0, "some day");
      });

      expect(result.current.notes).toEqual([]);
    });
  });
});
