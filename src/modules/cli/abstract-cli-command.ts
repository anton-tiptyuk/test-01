export abstract class AbstractCliCommand {
  abstract invoke(...args: any[]): Promise<any> | any;
  get argNumber(): number {
    return 0;
  }
  get argList(): string[] {
    return [];
  }
  get extraArgsInfo(): string {
    return undefined;
  }
}
