'use client';

import useStudents from '@/hooks/useStudents';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, loading, error } = useStudents();

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
      
      {students.length === 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.last_name || '-'}</td>
                  <td>{student.first_name || '-'}</td>
                  <td>{student.middle_name || '-'}</td>
                  <td>{student.group_name || 'Не указана'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.count}>
            Всего студентов: {students.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Students;