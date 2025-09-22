// components/Students/Students.tsx
'use client';

import { useState, useEffect } from 'react';
import useStudents from '@/hooks/useStudents';
import Student from './Student/Student';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, loading, error } = useStudents();
  const [localStudents, setLocalStudents] = useState(students);

  // Синхронизируем локальное состояние с данными из хука
  useEffect(() => {
    setLocalStudents(students);
  }, [students]);

  const handleDeleteStudent = (id: number) => {
    setLocalStudents(prevStudents => prevStudents.filter(student => student.id !== id));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Список студентов</h1>
        <div className={styles.loading}>Загрузка студентов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Список студентов</h1>
        <div className={styles.error}>Ошибка: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список студентов</h1>
      
      {localStudents.length === 0 ? (
        <div className={styles.empty}>Студенты не найдены</div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Группа</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {localStudents.map((student) => (
                <Student
                  key={student.id}
                  student={student}
                  onDelete={handleDeleteStudent}
                />
              ))}
            </tbody>
          </table>

          <div className={styles.count}>
            Всего студентов: {localStudents.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Students;