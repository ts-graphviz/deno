/**
 * Classes implemented in the 'ts-graphviz' library are designed to inherit from this class.
 * @category Base
 */
export abstract class GraphvizObject {
}
/**
 * Classes implemented in the 'ts-graphviz' library that implement the `toDot` method are designed to inherit from this class.
 * @category Base
 */
export abstract class DotObject extends GraphvizObject {
}
