function HashMap() {
  this.size = 16;
  this.buckets = new Array(this.size);
  this.keys = 0;

  this.hash = function hash(key) {
    let hash = 0;
    let hashLength = 4; // adjust to change character length of hash
    const primeNumber = 31;

    for (let i = 0; i < Math.min(key.length, hashLength); i++) {
      hash = primeNumber * hash + key.charCodeAt(i) % this.size;
    };
    // console.log("Hash: " + hash);
    return hash;
  }

  this.set = function set(key, value) {
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

  this.keylist = function keylist() {
    let keyArray = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          keyArray.push(pair[0]);
        }
      }
    }
    return ("Here's an array of the keys: " + keyArray);
  }

  this.valuelist = function valuelist() {
    let valueArray = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          valueArray.push(pair[1]);
        }
      }
    }
    return ("Here's an array of the values: " + valueArray);
  }

  this.entries = function entries() {
    let entryArray = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          entryArray.push(pair[0], pair[1]);
        }
      }
    }
    return ("Here's an array of the entries: " + entryArray);
  }

  this.clear = function clear() {
    this.buckets = new Array(this.size).fill(undefined);
    this.keys = 0;
    return "Hashmap has been emptied. Keys: " + this.keys;
  }
}

let map = new HashMap();

map.set("sonic", "a well-known video game hedgehog");
map.set("mario", "ostensibly a plumber");
map.set("peach", "mario's main squeeze");
map.set("master chief", "also known as 'John'");
map.set("solar jetman", "probably the best NES game ever made");
map.set("yoshi", "mario's best friend or sacrificial lamb");
map.set("dr gordon freeman", "the mute hero of the resonance cascade tragedy");
map.set("doomguy", "a man literally too angry to die");

console.log(map.get("sonic"));
map.remove("sonic");
console.log(map.get("sonic"));
console.log(map.get("peach"));
console.log(map.get("master chief"));
console.log(map.get("orange"));
console.log(map.numkeys());
console.log(map.has("sonic"));
console.log(map.has("mario"));
console.log(map.keylist());
console.log(map.valuelist());
console.log(map.entries());
console.log(map.clear());