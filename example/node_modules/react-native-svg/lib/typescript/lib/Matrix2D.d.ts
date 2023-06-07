export declare const identity: [number, number, number, number, number, number];
/**
 * Represents an affine transformation matrix, and provides tools for concatenating transforms.
 *
 * This matrix can be visualized as:
 *
 * 	[ a  c  tx
 * 	  b  d  ty
 * 	  0  0  1  ]
 *
 * Note the locations of b and c.
 **/
/**
 * Reset current matrix to an identity matrix.
 * @method reset
 **/
export declare function reset(): void;
/**
 * Returns an array with current matrix values.
 * @method toArray
 * @return {Array} an array with current matrix values.
 **/
export declare function toArray(): [number, number, number, number, number, number];
/**
 * Appends the specified matrix properties to this matrix. All parameters are required.
 * This is the equivalent of multiplying `(this matrix) * (specified matrix)`.
 * @method append
 * @param {Number} a2
 * @param {Number} b2
 * @param {Number} c2
 * @param {Number} d2
 * @param {Number} tx2
 * @param {Number} ty2
 **/
export declare function append(a2: number, b2: number, c2: number, d2: number, tx2: number, ty2: number): void;
/**
 * Generates matrix properties from the specified display object transform properties, and appends them to this matrix.
 * For example, you can use this to generate a matrix representing the transformations of a display object:
 *
 * 	reset();
 * 	appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
 * 	var matrix = toArray()
 *
 * @method appendTransform
 * @param {Number} x
 * @param {Number} y
 * @param {Number} scaleX
 * @param {Number} scaleY
 * @param {Number} rotation
 * @param {Number} skewX
 * @param {Number} skewY
 * @param {Number} regX Optional.
 * @param {Number} regY Optional.
 **/
export declare function appendTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): void;
