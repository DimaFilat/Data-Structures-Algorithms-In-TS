function merge(arr : number[], tempArray : number[], 
    lowerIndex : number, middleIndex : number, upperIndex : number) {
    let lowerStart : number = lowerIndex;
    let lowerStop : number = middleIndex;
    let upperStart : number = middleIndex + 1;
    let upperStop : number = upperIndex;
    let count : number = lowerIndex;
    while(lowerStart <= lowerStop && upperStart <= upperStop) {
        if(arr[lowerStart] < arr[upperStart]) {
            tempArray[count++] = arr[lowerStart++];
        } else {
            tempArray[count++] = arr[upperStart++];
        }
    }
    while((lowerStart <= lowerStop)) {
        tempArray[count++] = arr[lowerStart++];
    }
    while((upperStart <= upperStop)) {
        tempArray[count++] = arr[upperStart++];
    }
    for(let i : number = lowerIndex; i <= upperIndex; i++) {
        arr[i] = tempArray[i];
    }
}

function mergeSrt(arr : number[], tempArray : number[], lowerIndex : number, upperIndex : number) {
    if(lowerIndex >= upperIndex) {
        return;
    }
    let middleIndex : number = ((lowerIndex + upperIndex) / 2|0);
    mergeSrt(arr, tempArray, lowerIndex, middleIndex);
    mergeSrt(arr, tempArray, middleIndex + 1, upperIndex);
    merge(arr, tempArray, lowerIndex, middleIndex, upperIndex);
}

function MergeSort(arr : number[]) {
    let size : number = arr.length;
    let tempArray : number[] = Array(size);
    mergeSrt(arr, tempArray, 0, size - 1);
}

function main() {
    let array : number[] = [3, 4, 2, 1, 6, 5, 7, 8, 1, 1];
    MergeSort(array);
    console.info(array);
}

main();