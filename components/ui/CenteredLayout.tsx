import { ReactNode } from 'react';

export const CenteredLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid place-content-center bg-gray-200 min-h-screen min-w-screen">
      <main id="main" className="bg-white px-10 py-10 rounded-md shadow">
        {children}
      </main>
    </div>
  );
};
