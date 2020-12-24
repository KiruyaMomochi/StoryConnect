declare module 'worker-loader!./sqlite-worker' {
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

    // You need to change `Worker`, if you specified a different value for the `workerType` option
    class SqliteWebpackWorker extends Worker {
        constructor();
        public postMessage(message: Action, options?: PostMessageOptions): void;
        public postMessage(message: Action, transfer: Transferable[]): void;
    }

    export default SqliteWebpackWorker;
}
