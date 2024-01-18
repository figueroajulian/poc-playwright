export function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function validateTimeElapsed(timeElapsed: number, timeout: number, msg: string) {
    if (timeElapsed > timeout) {
        throw new Error(`Timeout: ${msg}`);
    }
}