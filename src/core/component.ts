export class ComponentDescriptor {
  constructor(
    public readonly selector: string,
    public readonly component: any,
    public readonly template: any,
    public readonly style: any
  ) {}
}
