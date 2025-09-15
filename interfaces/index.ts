export interface ITodo {
  id: string;
  title: string;
  body: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}