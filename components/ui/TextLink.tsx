import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface TextLinkPropsInterface
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  children: ReactNode;
  href: string;
  additionalClasses?: string;
}

export const TextLink = ({
  href,
  additionalClasses,
  children,
  ...rest
}: TextLinkPropsInterface) => {
  return (
    <Link href={href}>
      <a
        className={`text-blue-500 hover:text-blue-800 ${
          additionalClasses || ''
        }`}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
};
