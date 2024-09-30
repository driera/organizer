export type Note = {
  message: string;
  dueDate: "today" | "some day";
};

export type Notes = Note[];
