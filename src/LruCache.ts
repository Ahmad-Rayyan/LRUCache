class LruCache {
  private cacheMap: Map<string, string>;
  private size: number;

  constructor(maxEntries: number) {
    this.cacheMap = new Map<string, string>();
    this.size = maxEntries;
  }

  public get(key: string) {
    // If the Item is exist then we should move it to the Top
    const alreadyCashed = this.cacheMap.has(key);
    let item: any;
    if (alreadyCashed) {
      console.log(`Item (${key}) already cashed, delete then re-insert`);
      item = this.cacheMap.get(key);
      this.cacheMap.delete(key);
      this.cacheMap.set(key, item);
    }
    return item;
  }

  public put(key: string, value: string) {
    if (this.cacheMap.size >= this.size) {
      // least-recently used cache eviction strategy
      const keyToDelete = this.cacheMap.keys().next().value;
      console.log(
        `Map is full, delete least recently used item (${keyToDelete})`
      );
      this.cacheMap.delete(keyToDelete);
    }

    console.log(`Map size = (${this.cacheMap.size}), add item (${key})`);
    this.cacheMap.set(key, value);
    console.log(`Map size = (${this.cacheMap.size})`);
  }

  public getAll() {
    console.log("Map:", [...this.cacheMap.entries()]);
    return [...this.cacheMap.entries()];
  }
}

module.exports = LruCache;
