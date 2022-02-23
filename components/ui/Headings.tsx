import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface HeadingPropsInterface
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  children: ReactNode;
  type: 'h1' | 'h2' | 'h3';
  additionalClasses?: string;
}

export const Heading = ({
  additionalClasses,
  type,
  children,
}: HeadingPropsInterface) => {
  const baseClasses = `${
    additionalClasses || ''
  } font-bold leading-7 text-gray-900 sm:truncate mb-8`;
  const h1Classes = `${baseClasses} text-3xl`;
  const h2Classes = `${baseClasses} text-2xl`;
  const h3Classes = `${baseClasses} text-xl`;

  switch (type) {
    case 'h1':
      return <h1 className={h1Classes}>{children}</h1>;
    case 'h2':
      return <h2 className={h2Classes}>{children}</h2>;
    case 'h3':
      return <h3 className={h3Classes}>{children}</h3>;
  }
};
