'use strict';

import { spawn } from 'child_process';
import { connection } from './server';
import {
    IConnection,
    RemoteWindow, MessageActionItem
} from 'vscode-languageserver';

export function showInstallMessage() {
    let item = {
        title: 'Install',
    };
    // FIXME: might not be able spawn across the IPC barrier?, we can send notifications though
    connection.window.showErrorMessage('The sourcekitten command was not found. Would you like to install it?', item).then(selection => {
        if (selection === item) {
            spawn({
                darwin: 'open',
                win32: 'explorer',
                linux: 'xdg-open'
            }[process.platform], ['https://github.com/jpsim/SourceKitten/']);
        }
    })
}