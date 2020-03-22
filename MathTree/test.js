const p1 = {
    first: 'Georg',
    last: 'Auge'
};
const p2 = {
    first: "Usain",
    last: "Bolt",
    fast: true
};
function pow(x, y = 23) {
    return Math.pow(x, y);
}
console.log(pow(2, 3));
