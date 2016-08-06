# Swift for Visual Studio Code

This extension adds rich language support for the Swift language to VS Code. These features are
provided by the Swift framework itself through
[SourceKit](https://github.com/apple/swift/tree/master/tools/SourceKit)
and [SourceKitten](https://github.com/jpsim/SourceKitten).

![https://github.com/RLovelett/vscode-swift/blob/master/vscode-swift-language/images/vscode-swift-documentation.gif?raw=true](https://github.com/RLovelett/vscode-swift/blob/master/vscode-swift-language/images/vscode-swift-documentation.gif?raw=true)

## Development setup
- run npm install inside the `vscode-swift-language` and `vscode-swift-language-server` folders
- open VS Code on `vscode-swift-language` and `vscode-swift-language-server`
- we use `typings` to find type definitions for typescript interfaces to. `npm install typings -g`

## Developing the server
- open VS Code on `vscode-swift-language-server`
- run `npm run compile` or `npm run watch` to build the server and copy it into the `vscode-swift-language` folder
- to debug press F5 which attaches a debugger to the server

## Developing the extension/client
- open VS Code on `vscode-swift-language`
- run F5 to build and debug the extension

## Adding a new npm module
1. Add your `foo` module  extension project or the server project `package.json` as needed
2. `npm install`
3. Run the appropriate `typings` command to provide appropriate typescript API see [Typings](https://github.com/typings/typings)  
4. In your source file:

        "use strict";
        import "foo";
        foo.//completion
      
