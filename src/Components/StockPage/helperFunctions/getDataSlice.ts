export function getDataSlice (data: number[][] | undefined, time: number) {
    if (data === undefined) return null;
    console.log(time);
    let start = 0;
    let end = data.length-1;
    while (start <= end) {
        let mid = Math.round(start + (end - start) / 2);
        console.log("mid is" + mid);
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