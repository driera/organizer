import { renderHook, act } from "@testing-library/react";
import { useNotes } from "./useNotes";
import { NotesRepository } from "./repository/notes-repository";
import { dueDates } from "./types";

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
        { message: "Note 1", dueDate: dueDates.TODAY },
        { message: "Note 2", dueDate: dueDates.TODAY },
        { message: "Note 3", dueDate: dueDates.TODAY }
      ];
      getNotesSpy.mockReturnValue(initialNotes);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(1, "some day");
      });

      expect(result.current.notes[1].dueDate).toBe(dueDates.SOME_DAY);
    });

    it("does not affect other notes when updating one note", () => {
      const initialNotes = [
        { message: "Note 1", dueDate: dueDates.TODAY },
        { message: "Note 2", dueDate: dueDates.TODAY },
        { message: "Note 3", dueDate: dueDates.TODAY }
      ];
      getNotesSpy.mockReturnValue(initialNotes);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(1, "some day");
      });

      expect(result.current.notes[0].dueDate).toBe(dueDates.TODAY);
      expect(result.current.notes[1].dueDate).toBe(dueDates.SOME_DAY);
      expect(result.current.notes[2].dueDate).toBe(dueDates.TODAY);
    });

    it("persists changes to localStorage via NotesRepository", () => {
      const initialNotes = [
        { message: "Note 1", dueDate: dueDates.TODAY },
        { message: "Note 2", dueDate: dueDates.TODAY }
      ];
      getNotesSpy.mockReturnValue(initialNotes);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(0, "some day");
      });

      expect(setNotesSpy).toHaveBeenCalledWith([
        { message: "Note 1", dueDate: dueDates.SOME_DAY },
        { message: "Note 2", dueDate: dueDates.TODAY }
      ]);
    });

    it("handles invalid index gracefully (negative index)", () => {
      const initialNotes = [{ message: "Note 1", dueDate: dueDates.TODAY }];
      getNotesSpy.mockReturnValue(initialNotes);

      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current.updateNoteDueDate(-1, "some day");
      });

      expect(result.current.notes).toEqual(initialNotes);
    });

    it("handles invalid index gracefully (index out of bounds)", () => {
      const initialNotes = [{ message: "Note 1", dueDate: dueDates.TODAY }];
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
