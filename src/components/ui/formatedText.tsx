import React from 'react';

type Props = { text: string };

export function FormatedText({ text }: Props) {
  if (!text) return null;
  const regex = /(`[^`]+`)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(__([^_]+)__)|(~~([^~]+)~~)|(\$([^$]+)\$)|(\@([^@]+)\@)|(\n)/g;

  const parse = (input: string) => {
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;
    while ((match = regex.exec(input)) !== null) {
      if (match.index > lastIndex) {
        elements.push(input.slice(lastIndex, match.index));
      }
      switch (true) {
        case !!match[1]:
          elements.push(
            <code key={key++} className="bg-muted px-1 rounded text-sm font-mono">
              {match[1].slice(1, -1)}
            </code>
          );
          break;
        case !!match[2]:
          elements.push(<strong key={key++}>{match[3]}</strong>);
          break;
        case !!match[4]:
          elements.push(<em key={key++}>{match[5]}</em>);
          break;
        case !!match[6]:
          elements.push(
            <span key={key++} style={{ textDecoration: 'underline' }}>
              {match[7]}
            </span>
          );
          break;
        case !!match[8]:
          elements.push(
            <span key={key++} style={{ textDecoration: 'line-through' }}>
              {match[9]}
            </span>
          );
          break;
        case !!match[10]:
          elements.push(
            <span key={key++} className="text-primary font-bold">
              {match[11]}
            </span>
          );
          break;
        case !!match[12]:
          elements.push(
            <span key={key++} className="text-secondary font-bold">
              {match[13]}
            </span>
          );
          break;
        case !!match[14]:
          elements.push(<br key={key++} />);
          break;
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < input.length) {
      elements.push(input.slice(lastIndex));
    }
    return elements;
  };

  return <span>{parse(text)}</span>;
}
