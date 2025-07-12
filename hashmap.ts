class SimpleHashMap {
  private size: number;
  private buckets: Array<{ key: string; value: any } | undefined>;

  constructor(size: number = 10) {
    this.size = size;
    this.buckets = new Array(this.size);
  }

  private hash(key: string): number {
    let sum = 0;
    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i);
    }
    return sum % this.size;
  }

  put(key: string, value: any): void {
    const index = this.hash(key);
    this.buckets[index] = { key, value };
  }

  get(key: string): any {
    const index = this.hash(key);
    const item = this.buckets[index];
    if (item && item.key === key) return item.value;
    return undefined;
  }

  remove(key: string): void {
    const index = this.hash(key);
    const item = this.buckets[index];
    if (item && item.key === key) this.buckets[index] = undefined;
  }

  print(): void {
    console.log(this.buckets);
  }
}
