import {
  EdgeAttributes,
  EdgeTargetTuple,
  IAttributes,
  IEdge,
} from "../types.ts";
import { DotObject } from "./abstract.ts";
import { attribute } from "../attribute.ts";
import { Attributes } from "./attributes_base.ts";
import { isNodeRefLike } from "./utils.ts";
/**
 * @category Primary
 */
export class Edge extends DotObject implements IEdge {
  /** Comments to include when outputting with toDot. */
  public comment?: string;
  public readonly attributes: IAttributes<attribute.Edge>;
  constructor(
    public readonly targets: EdgeTargetTuple,
    attributes?: EdgeAttributes,
  ) {
    super();
    if (
      targets.length < 2 &&
      (isNodeRefLike(targets[0]) && isNodeRefLike(targets[1])) === false
    ) {
      throw Error(
        "The element of Edge target is missing or not satisfied as Edge target.",
      );
    }
    this.attributes = new Attributes<attribute.Edge>(attributes);
  }
}
