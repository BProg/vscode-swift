'use strict';

import { execFile } from 'child_process';

import {
    SwiftType,
    SwiftCompletionSuggestion,
} from './swiftSourceTypes';

import {
    CompletionItem,
    CompletionItemKind,
} from 'vscode-languageserver';

import {
    sourceKittenPath
} from './server';

/**
 * Mapps a CompletionSuggestion to a CompletionItem
 *
 * @export
 * @param {SwiftCompletionSuggestion} suggestion
 * @param {*} index
 * @param {*} value
 * @returns {CompletionItem}
 */
export function createCompletionItem(suggestion: SwiftCompletionSuggestion, index: any, value: any): CompletionItem {
    let item: CompletionItem = CompletionItem.create(suggestion.descriptionKey);
    item.detail = `${suggestion.moduleName}.${suggestion.typeName}`;
    item.documentation = suggestion.docBrief;
    // default types
    item.kind = SwiftType.completionKindForSwiftType(suggestion.kind);

    let snippet = createSnippet(suggestion);

    // overrides
    switch (suggestion.kind) {
        case SwiftType.DeclModule:
            item.kind = CompletionItemKind.Module;
            break;
        case SwiftType.Keyword:
            item.detail = `Keyword: ${suggestion.name}`;
            item.documentation = '';
            item.kind = CompletionItemKind.Keyword;
            break;
        case SwiftType.DeclFunctionFree:
            item.kind = CompletionItemKind.Function;
            break;
        case SwiftType.DeclVarInstance:
        case SwiftType.DeclVarGlobal:
            item.kind = CompletionItemKind.Variable;
            break;
        case SwiftType.DeclProtocol:
            item.kind = CompletionItemKind.Interface;
            break;
        case SwiftType.DeclClass:
            item.kind = CompletionItemKind.Class;
            break;
        case SwiftType.DeclStruct:
            item.kind = CompletionItemKind.Value;
            break;
        case SwiftType.DeclFunctionConstructor:
            item.kind = CompletionItemKind.Constructor;
            item.insertText = suggestion.sourcetext;
            item.documentation = suggestion.descriptionKey;
            // constructor completions can be ({params}) or  just {params}
            // depending on cursor position
            // remove leading and trailing parens for '()' completions on constructors
            snippet = snippet.replace(/\(.+?\)/g, "")
            break;
        case SwiftType.DeclEnum:
            item.kind = CompletionItemKind.Enum;
            break;
        case SwiftType.DeclTypealias:
            item.kind = CompletionItemKind.Reference;
            break;
    }
    if (snippet.length != suggestion.sourcetext.length) {
        item.insertText = snippet;
    }
    return item;
}


// Helpers

/**
 * Creates a snippet formatted string with cursor positions from sourcekit sourcetext
 *
 * @param {SwiftCompletionSuggestion} suggestion
 * @returns {string}
 */
function createSnippet(suggestion: SwiftCompletionSuggestion): string {
    let cursorIndex = 1
    const replacer = suggestion.sourcetext.replace(/<#T##(.+?)#>/g, (_, group) => {
        return `\{{${cursorIndex++}:${group.split('##')[0]}}}`;
    });
    return replacer.replace('<#code#>', `\{{${cursorIndex++}}}`);
};