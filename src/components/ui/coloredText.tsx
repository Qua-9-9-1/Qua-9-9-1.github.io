export function ColoredText({ text }: { text: string }) {
  if (!text) return null;

  const parts = text.split('*');

  return (
    <span>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <span key={index} className="text-primary font-bold">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
