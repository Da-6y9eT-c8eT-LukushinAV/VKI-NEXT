// types/StudentInterface.ts
interface StudentInterface {
  id: number;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  groupId: number | null;
  group_name?: string;
}

export default StudentInterface;