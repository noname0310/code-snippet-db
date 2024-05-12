//make child process, use import/export
import { exec } from 'child_process';
import { API_URL } from '../src/constants/apolloClient';
import fs from 'fs-extra';
import path from 'path';

function execAsync(cmd: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const child = exec(cmd);
    
        child.stdout?.on('data', (data) => {
            console.log(data);
        });
    
        child.stderr?.on('data', (data) => {
            console.log(data);
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject();
            }
        });
    });
}

async function readDirectoriesRecursively(dir: string): Promise<string[]> {
    const result: string[] = [];

    const folders = (await fs.readdir(dir, { withFileTypes: true }))
        .filter(folder => folder.isDirectory())
        .filter(folder => !folder.name.startsWith('.'))
        .filter(folder => !folder.name.startsWith('node_modules'))
        .map(folder => path.join(dir, folder.name));

    for (const folder of folders) {
        result.push(folder);

        const subFolders = await readDirectoriesRecursively(folder);
        result.push(...subFolders);
    }

    return result;
}

async function removeFolderRecursively(dir: string, removeDir: string): Promise<void> {
    const folders = await readDirectoriesRecursively(dir);
    for (const folder of folders) {
        if (path.basename(folder) === removeDir) {
            await fs.remove(folder);
        }
    }
}

async function main() {
    await removeFolderRecursively('..', '__generated__');
    await execAsync(`apollo service:download --endpoint=${API_URL} graphql-schema.json`);
    await execAsync('apollo codegen:generate --localSchemaFile=graphql-schema.json --target=typescript --tagName=gql');
    await fs.copy('./__generated__', '../src/__generated__');
}

main();
