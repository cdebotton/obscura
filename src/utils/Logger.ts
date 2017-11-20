export enum Emoji {
  Rocket = '🚀',
  Positive = '✅',
  Negative = '❌',
}

const wrapName = (name: string) => `[${name}]`;

export const start = (name: string, message: string, emoji?: Emoji) => {
  const output = [wrapName(name), message, emoji].join(' ') + '\n';
  process.stdout.write(output);
};

export const error = (name: string, message: string, emoji?: Emoji) => {
  const output = [wrapName(name), message, emoji].join(' ') + '\n';
  process.stderr.write(output);
};
