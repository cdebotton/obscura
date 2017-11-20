import { Readable } from 'stream';

export class StringStream extends Readable {
  private ended = false;
  public constructor(private str: string) {
    super();
  }

  public _read() {
    if (!this.ended) {
      process.nextTick(() => {
        this.push(this.str);
        this.push(null);
      });
      this.ended = true;
    }
  }
}
