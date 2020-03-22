interface Person {
    first: string, 
    last: string,
    [key: string]: any
}

const p1: Person = {
    first: 'Georg',
    last: 'Auge'
};

const p2: Person = {
    first: "Usain",
    last: "Bolt",
    fast: true
}

function pow(x:number, y:number = 23): number {
    return Math.pow(x,y);
}

console.log(pow(2, 3));
