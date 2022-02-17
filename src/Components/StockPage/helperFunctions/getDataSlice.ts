export function getDataSlice (data: number[][] | undefined, time: number): number[][] {
    // We return an empty array if data is undefined soo we dont get any typeScript error.
    if (data === undefined) return [[0,0]];

    let start = 0;
    let end = data.length-1;
    while (start <= end) {
        let mid = Math.round(start + (end - start) / 2);
        if (data[mid][0] === time) {
            return data.slice(mid);
        } else if (data[mid][0] < time) {
            start = mid+1;
        } else {
            end = mid-1;
        }
    }
    return data.slice(start);
}