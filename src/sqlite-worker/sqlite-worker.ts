import initSqlJs from "sql.js";
import { SqlJs } from "sql.js/module";

/* eslint-disable-next-line no-restricted-globals */
const ctx: Worker = self as any
let db: SqlJs.Database

// type OpenAction = 'open' | 'exec'
// type buffer = 

interface OpenAction {
    id: number,
    action: 'open',
    buffer: ArrayBuffer
}

interface ExecAction {
    action: 'exec',
    command: string
}

type Action = OpenAction | ExecAction

ctx.addEventListener("message", async (event: MessageEvent<Action>) => {
    const config = {
        locateFile: (filename: string) => `https://cdn.jsdelivr.net/npm/sql.js@1.4.0/dist/${filename}`
    }
    const sqljs = await initSqlJs(config)
    switch (event.data.action) {
        case 'open':
            db = new sqljs.Database(new Uint8Array(event.data.buffer))
            ctx.postMessage(db.exec('SELECT * FROM sqlite_master'))            
            break;
        case 'exec':
            const result = db.exec(event.data.command)
            ctx.postMessage(result)
            break;
        default:
            break;
    }
})

export default ctx
