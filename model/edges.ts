import {
  EdgeTarget,
  EdgeAttributes,
  IAttributes,
  EdgeTargets,
} from "../types.ts";
import { DotObject } from "./abstract.ts";
import { attribute } from "../attribute.ts";
import { Attributes } from "./attributes_base.ts";
/**
 * @category Primary
 */
export class Edge extends DotObject {
  /** Comments to include when outputting with toDot. */
  public comment?: string;
  public readonly attributes: IAttributes<attribute.Edge>;
  constructor(
    public readonly targets: ReadonlyArray<EdgeTarget | EdgeTargets>,
    attributes?: EdgeAttributes,
  ) {
    super();
    this.attributes = new Attributes<attribute.Edge>(attributes);
  }
}
