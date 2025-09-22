// hooks/useStudents.ts
import { useState, useEffect, useCallback } from 'react';
import type StudentInterface from '@/types/StudentInterface';
import type GroupInterface from '@/types/GroupInterface';

interface StudentWithGroup extends StudentInterface {
  group_name?: string;
}

const useStudents = () => {
  const [students, setStudents] = useState<StudentWithGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      
      // Загружаем группы
      const groupsResponse = await fetch('/api/groups');
      if (!groupsResponse.ok) throw new Error('Ошибка загрузки групп');
      const groups: GroupInterface[] = await groupsResponse.json();

      // Загружаем студентов
      const studentsResponse = await fetch('/api/students');
      if (!studentsResponse.ok) throw new Error('Ошибка загрузки студентов');
      const studentsData: StudentInterface[] = await studentsResponse.json();

      // Объединяем данные
      const studentsWithGroups = studentsData.map((student) => ({
        ...student,
        group_name: student.groupId 
          ? groups.find(group => group.id === student.groupId)?.name 
          : 'Не указана'
      }));

      setStudents(studentsWithGroups);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return { students, loading, error, refetch: fetchStudents };
};

export default useStudents;