export enum dueDates {
  TODAY = "today",
  SOME_DAY = "some day"
}

export type Note = {
  message: string;
  dueDate: dueDates;
};

export type Notes = Note[];
