export const optimizeCommands = (input: string): string => {
  return input.replace(/(.)\1+/g, (match, char) => `${match.length}${char}`);
};