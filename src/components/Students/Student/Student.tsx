// components/Students/Student/Student.tsx
'use client';

import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

interface StudentProps {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: StudentProps): React.ReactElement => {
  const handleDelete = async () => {
    if (confirm(`Вы уверены, что хотите удалить студента ${student.first_name} ${student.last_name}?`)) {
      try {
        const response = await fetch(`/api/students/${student.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onDelete(student.id);
        } else {
          alert('Ошибка при удалении студента');
        }
      } catch (error) {
        alert('Ошибка при удалении студента');
      }
    }
  };

  return (
    <tr className={styles.student}>
      <td>{student.id}</td>
      <td>{student.last_name || '-'}</td>
      <td>{student.first_name || '-'}</td>
      <td>{student.middle_name || '-'}</td>
      <td>{student.group_name || 'Не указана'}</td>
      <td>
        <button
          onClick={handleDelete}
          className={styles.deleteButton}
          title="Удалить студента"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default Student;