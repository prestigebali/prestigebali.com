'use client';
import { PortableText as ReactPortableText } from '@portabletext/react';
import type { PortableTextProps } from '@portabletext/react';

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold my-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold my-2">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => {
      if (children && children.length === 1 && children[0] === '') {
        return <br />;
      }
      return <p className="mb-4">{children}</p>;
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : ''}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

// This component is a wrapper around the `PortableText` component from `@portabletext/react`.
// It filters out any `undefined` or nullish blocks from the value before rendering.
// This prevents the "Unknown block type "undefined"" error from occurring.
export function PortableText({ value, ...props }: PortableTextProps) {
  const filteredValue = Array.isArray(value) ? value.filter(Boolean) : value;

  return (
      <ReactPortableText 
          value={filteredValue} 
          components={portableTextComponents} 
          {...props} 
      />
  )
}
