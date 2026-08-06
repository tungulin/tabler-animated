import clsx from 'clsx';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & NextLinkProps;

export const Link = ({ target = '_blank', rel = 'noopener noreferrer', ...props }: LinkProps) => (
  <NextLink
    className={clsx('text-blue-500 underline', props.className)}
    target={target}
    rel={rel}
    {...props}
  />
);
