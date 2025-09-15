import Students from '@/components/Groups/Groups';
import Page from '@/components/layout/Page/Page';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Группы - Вэб разработка ВКИ - Next.js шаблон',
  description: 'Шаблон для веб-разработки с использованием Next.js, React Hook Form, Yup, SCSS, Eslint, TanStack Query (React Query)',
};

const GroupsPage = (): React.ReactNode => (
  <Page>
    <h1>Students</h1>
    <Students />
    
  </Page>
);

export default GroupsPage;
