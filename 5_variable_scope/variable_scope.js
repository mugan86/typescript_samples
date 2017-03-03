var global_num = 12; //global variable
var Numbers = (function () {
    function Numbers() {
        this.num_val = 13; //class variable
    }
    Numbers.prototype.storeNum = function () {
        var local_num = 14; //local variable
    };
    return Numbers;
}());
Numbers.sval = 10; //static field
console.log("Global num: " + global_num);
console.log(Numbers.sval); //static variable
var obj = new Numbers();
console.log("Global num: " + obj.num_val);
