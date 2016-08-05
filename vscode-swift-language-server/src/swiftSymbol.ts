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

export declare module SwiftStructure {
    // this gets improved with constant propagation;
    // https://github.com/Microsoft/TypeScript/issues/7565

    export const KEY_KIND: "key.kind";
    export const KEY_OFFSET: "key.offset";
    export const KEY_NAMEOFFSET: "key.nameoffset";
    export const KEY_NAMELENGTH: "key.namelength";
    export const KEY_LENGTH: "key.length";
    export const KEY_ACCESSIBILITY: "key.accessibility";
    export const KEY_TYPENAME: "key.typename";
    export const KEY_NAME: "key.name";
    export const KEY_BODYOFFSET: "key.bodyoffset";
    export const KEY_BODYLENGTH: "key.bodylength";
    export const KEY_SUBSTRUCTURE: "key.substructure";
    export const KEY_DIAGNOSTIC_STAGE: "key.diagnostic_stage";

    export interface KeySubstructure {
        // with https://github.com/Microsoft/TypeScript/issues/7565
        // [SwiftStructure.KEY_KIND]: SwiftType;
        // I think, silly USR's'
        ["key.kind"]: SwiftType;
        ["key.offset"]: number;
        ["key.nameoffset"]: number;
        ["key.namelength"]: number;
        ["key.length"]: number;
        ["key.accessibility"]: string;
        ["key.typename"]: string;
        ["key.name"]: string;

        ["key.bodyoffset"]: number;
        ["key.bodylength"]: number;
        ["key.substructure"]: KeySubstructure[];
    }

    export interface SwiftRoot {
        ["key.substructure"]: KeySubstructure[];
        ["key.offset"]: number;
        ["key.diagnostic_stage"]: string;
        ["key.length"]: number;
    }

}