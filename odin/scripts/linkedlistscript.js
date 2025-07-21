container = document.getElementById("container");

function ListNode(value, nextNode) {
  this.value = value;
  this.nextNode = nextNode;
};

function linkedList() {
  this.nodes = [];

  this.toString = function toString() {
    let string = "";
    for (let i = 0; i < this.nodes.length; i++) {
      string = string.concat(" ) -> ( ", this.nodes[i].value);
    }
    string = string.slice(6);
    string = string.concat(" ) -> ( null )");
    return string.toString();
  }

  this.append = function append(value) {
    let len = this.nodes.length;
    this.nodes.push(new ListNode(value, "null"));
    if (len != 0) {
      this.nodes[len - 1].nextNode = value.toString();
    }
    this.toString();
  }

  this.prepend = function prepend(value) {
    this.nodes.unshift(new ListNode(value, this.nodes[0].value.toString()));
    this.toString();
  }

  this.pop = function pop() {
    this.nodes.pop();
    this.nodes[this.nodes.length - 1].nextNode = "null";
    this.toString();
  }

  this.size = function size() {
    return this.nodes.length.toString();
  }

  this.head = function head() {
    return this.nodes[this.nodes.length - 1].value.toString();
  }

  this.tail = function tail() {
    return this.nodes[0].value.toString();
  }

  this.at = function at(n) {
    return "value at index " + n + " is " + this.nodes[n].value + ", next node is: " + this.nodes[n].nextNode.toString();
  }

  this.find = function find(string) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].value == string) {
        return ("'" + this.nodes[i].value + "'" + " found at index " + i).toString();
      }
    }
  }

  this.contains = function contains(string) {
    let doesContain = false;
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].value == string) {
        doesContain = true;
      }
    }
    return (doesContain ? "the list contains the string: " + string : "the list does not contain the string: " + string).toString();
  }
};

const list = new linkedList();

const returnList = (command, string) => {
  let commandNode = document.createElement("p");
  let commandNodeContents = document.createTextNode(command);
  commandNode.appendChild(commandNodeContents);
  container.appendChild(commandNode);
  
  let returnString = document.createElement("code");
  let returnStringContents = document.createTextNode(string);
  returnString.appendChild(returnStringContents);
  container.appendChild(returnString);
}

list.append("dog");
returnList("list.append('dog')", list.toString());
list.append("cat");
returnList("list.append('cat')", list.toString());
list.append("fish");
returnList("list.append('fish')", list.toString());
list.append("bear");
returnList("list.append('bear')", list.toString());
list.prepend("snake");
returnList("list.prepend('snake')", list.toString());
list.pop();
returnList("list.pop()", list.toString());
returnList("list.size()", list.size());
returnList("list.head()", list.head());
returnList("list.tail()", list.tail());
returnList("list.at(2)", list.at(2));
returnList("list.find('cat')", list.find("cat"));
returnList("list.contains('fish')", list.contains("fish"));
returnList("list.contains('monkey')", list.contains("monkey"));