const TECH_EXCEPTIONS: Record<string, string> = {
  'C++': 'cpp',
  'C#': 'csharp',
  '.NET': 'dotnet',
  'IntelliJ IDEA': 'intellij',
};

export const getTechImage = (name: string): string => {
  if (TECH_EXCEPTIONS[name]) {
    return `techs/${TECH_EXCEPTIONS[name]}.webp`;
  }

  const formattedName = name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
  return `techs/${formattedName}.webp`;
}