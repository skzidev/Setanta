#!/usr/bin/env node
import * as readline from 'readline';
import { Interpreter } from './i10r';
import { Parser, ASTKinds } from './parser';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getLine() : Promise<string> {
    return new Promise(resolve => {
        rl.question('λ: ', resp => {
            resolve(resp);
        });
    });
}

async function main() {
    const i = new Interpreter();
    while(true){
        const res = await getLine();
        const parser = new Parser(res);
        const p = parser.parse();
        if(p.err){
            console.log(''+p.err);
            continue;
        }
        const ast = p.ast!;
        if(ast.length === 1 && ast[0].kind === ASTKinds.Stmt_2){
            console.log(i.evalExpr(ast[0].expr));
            continue;
        }
        i.interpret(ast);
    }
}

main();
