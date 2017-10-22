import { Readable } from 'stream';

export const stringToStream = (content: string): Readable => {
  let ended = false;
  return new Readable({
    read() {
      if (!ended) {
        process.nextTick(() => {
          this.push(new Buffer(content));
          this.push(null);
        });
        ended = true;
      }
    }
  });
};