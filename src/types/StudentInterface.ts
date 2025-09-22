interface Student {
  id?: number; // AUTOINCREMENT, поэтому может не быть при создании
  first_name: string | null;
  last_name: string | null;
  middle_name?: string | null; // опциональное поле
  groupId?: number | null; // опциональное поле
};

export default Student;