export abstract class AstNodeBase {
  properties: Record<string, string> = {};

  nested: Record<string, AstNodeBase[]> = {};

  protected currentChild: AstNodeBase = undefined;

  protected _name: string;

  protected addProperty(name: string, value: string) {
    this.properties[name] = value;
  }

  protected addNested(node: AstNodeBase) {
    this.currentChild = node;
    const { name } = node;
    if (!this.nested[name]) {
      this.nested[name] = [];
    }
    this.nested[name].push(node);
  }

  get name() {
    return this._name;
  }

  finalize() {
    if (this.currentChild) this.currentChild.finalize();
    this.currentChild = undefined;
  }

  abstract pushLine(line: string): void;

  toJSON() {
    const { name, properties, nested } = this;
    return { name, properties, nested };
  }
}
