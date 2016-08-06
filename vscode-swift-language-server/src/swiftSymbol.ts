'use strict';

import {
  SwiftType
} from './swiftSourceTypes';

/*
parses structure data:

{
  "key.substructure" : [
    {
      "key.kind" : "source.lang.swift.decl.struct",
      "key.offset" : 15,
      "key.nameoffset" : 22,
      "key.namelength" : 3,
      "key.bodyoffset" : 27,
      "key.bodylength" : 18,
      "key.accessibility" : "source.lang.swift.accessibility.internal",
      "key.substructure" : [
        {
          "key.kind" : "source.lang.swift.decl.var.instance",
          "key.offset" : 32,
          "key.nameoffset" : 36,
          "key.namelength" : 3,
          "key.length" : 12,
          "key.accessibility" : "source.lang.swift.accessibility.internal",
          "key.typename" : "Int",
          "key.name" : "bar"
        }
      ],
      "key.name" : "Foo",
      "key.length" : 31
    },
    {
      "key.kind" : "source.lang.swift.decl.var.global",
      "key.offset" : 51,
      "key.nameoffset" : 55,
      "key.namelength" : 1,
      "key.length" : 13,
      "key.accessibility" : "source.lang.swift.accessibility.internal",
      "key.name" : "a"
    }
  }
}
**/

export module SwiftStructure {
  export const keyKind = Symbol("key.kind");
  export const keyOffset = Symbol("key.offset");
  export const keyNameoffset = Symbol("key.nameoffset");
  export const keyNamelength = Symbol("key.namelength");
  export const keyLength = Symbol("key.length");
  export const keyAccessibility = Symbol("key.accessibility");
  export const keyTypename = Symbol("key.typename");
  export const keyName = Symbol("key.name");
  export const keyBodyoffset = Symbol("key.bodyoffset");
  export const keyBodylength = Symbol("key.bodylength");
  export const keySubstructure = Symbol("key.substructure");
  export const keyDiagnostic_stage = Symbol("key.diagnostic_stage");


  // this gets improved with constant propagation;
  // https://github.com/Microsoft/TypeScript/issues/7565
  // or optional classes properties
  // https://github.com/Microsoft/TypeScript/pull/8625
  // or allowing non builtin symbols for indexing keys
  // let kind = Symbol("key.kind")
  // [kind]: SwiftType;

  /**
   * Nodes along the AST
   *
   * @export
   * @interface Substructure
   */
  export interface Substructure {

    /**
     * @type {SwiftType}
     */
    ["key.kind"]: SwiftType;

    /**
     * @type {number}
     */
    ["key.offset"]: number;
    /**
     * @type {number}
     */
    ["key.nameoffset"]: number;
    /**
     * @type {number}
     */
    ["key.namelength"]: number;
    /**
     * @type {number}
     */
    ["key.length"]: number;

    /**
     * @type {string}
     */
    ["key.accessibility"]: string;
    /**
     * @type {string}
     */
    ["key.name"]: string;

    // currently classes cannot contain optional properties we need that, (more recent typescript versions have it)
    // compounding that, @decorators are not allowed in interfaces
    // I think that is something we could use to convert "key.typename" -> typename, and not use indexing definitions
    // to support parsing the json keys sourcekit/sourcekitten emit.
    // FIXME: maybe there is still a better way
    /**
     * @type {string}
     */
    ["key.typename"]?: string;

    /**
     * @type {number}
     */
    ["key.bodyoffset"]?: number;
    /**
     * @type {number}
     */
    ["key.bodylength"]?: number;
    /**
     * @type {Substructure[]}
     */
    ["key.substructure"]?: Substructure[];
  }

  /**
   * The root of the AST
   *
   * @export
   * @interface SwiftRoot
   */
  export interface SwiftRoot {
    /**
     * @type {Substructure[]}
     */
    ["key.substructure"]: Substructure[];
    /**
     * @type {string}
     */
    ["key.diagnostic_stage"]: string;
    /**
     * @type {number}
     */
    ["key.offset"]: number;
    /**
     * @type {number}
     */
    ["key.length"]: number;
  }

}