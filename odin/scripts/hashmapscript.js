function HashMap() {
  this.size = 16;
  this.buckets = new Array(this.size);
  this.keys = 0;

  this.hash = function hash(key) {
    let hash = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hash = primeNumber * hash + key.charCodeAt(i) % this.size;
    };

    //console.log("Hash: " + hash);
    return hash;
  }

  this.set = function put(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }
    this.buckets[index].push([key, value]);
    this.keys++;
  }

  this.get = function get(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          return this.buckets[index][i][1];
        }
      }
    }
    return null;
  }

  this.remove = function remove(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          this.buckets[index].splice(i, 1);
          this.keys--;
          return;
        }
      }
    }
  }

  this.has = function has(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          return ("The key " + key + " (hash: " + index + ")" + " exists in the map");
        }
      }
    }
    return ("The key " + key + " (hash: " + index + ")" + " does not exist in the map");
  }

  this.numkeys = function numkeys() {
    return ("There are " +  this.keys + " keys and the size is " + this.size);
  }
}

let map = new HashMap();

map.set("apple", "an apple is not a berry");
map.set("banana", "bananas are a berry");
map.set("peach", "peach is a stone fruit");
map.set("space cakes", "space cakes probably don't exist");
console.log(map.get("apple"));
map.remove("apple");
console.log(map.get("apple"));
console.log(map.get("banana"));
console.log(map.get("peach"));
console.log(map.get("orange"));
console.log(map.get("space cakes"));
console.log(map.numkeys());
console.log(map.has("apple"));
console.log(map.has("banana"));