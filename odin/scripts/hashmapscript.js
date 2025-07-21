function HashMap() {
  this.size = 16;
  this.buckets = new Array(this.size);

  this.hash = function hash(key) {
    let hash = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hash = primeNumber * hash + key.charCodeAt(i) % this.size;
    };

    console.log("Hash: " + hash)
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
          return;
        }
      }
    }
  }
}

let map = new HashMap();

map.set("apple", "berry");
map.set("banana", "also berry");
map.set("peach", "stone fruit");
map.set("space cakes", "probably don't exist");
console.log(map.get("apple"));
map.remove("apple");
console.log(map.get("apple"));
console.log(map.get("banana"));
console.log(map.get("peach"));
console.log(map.get("orange"));
console.log(map.get("space cakes"));