import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Link } from '@/shared/lib/i18n';

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const metadata: Metadata = {
  title: 'Article',
  description: 'Article page',
};

async function ArticlePage() {
  const data: Response = await fetch(
    'https://jsonplaceholder.typicode.com/todos/1',
  );

  const result: ITodo = await data.json();

  const cookieStore = await cookies();

  return (
    <div>
      <div>
        <h1>About</h1>
        <Link href='/'>Home</Link>

        <pre>{result.title}</pre>
      </div>

      <div>
        {cookieStore.getAll().map((cookie) => (
          <div key={cookie.name}>
            <p>Name: {cookie.name}</p>
            <p>Value: {cookie.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlePage;
