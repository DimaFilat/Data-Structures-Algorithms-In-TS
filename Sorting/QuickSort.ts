function quickSort(arr : number[], lower : number, upper : number) {
    if(upper <= lower) 
        return;
    let pivot : number = arr[lower];
    let start : number = lower;
    let stop : number = upper;
    while(lower < upper) {
        while(arr[lower] <= pivot && lower < upper) {
            lower++;
        };
        while(arr[upper] > pivot && lower <= upper) {
            upper--;
        };
        if(lower < upper) {
            swap(arr, upper, lower);
        }
    };
    swap(arr, upper, start);
    quickSort(arr, start, upper - 1);
    quickSort(arr, upper + 1, stop);
}

function QuickSort(arr : number[]) {
    let size : number = arr.length;
    quickSort(arr, 0, size - 1);
}

function swap(arr : number[], first : number, second : number) {
    let temp : number = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
}

function main(args : string[]) {
    let array : number[] = [3, 4, 2, 1, 6, 5, 7, 8, 1, 1];
    QuickSort(array);
    console.info(array);
}

main(null);
