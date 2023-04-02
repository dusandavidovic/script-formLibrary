type Buffer = {
  id: string;
};

class Form {
  buffer: Buffer = {
    id: "",
  };

  constructor(id: string) {
    this.buffer.id = id;
  }
}
