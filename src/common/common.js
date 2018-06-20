
export function IsNullOrUndefined(obj){
    // undefined
    if (typeof(obj) == 'undefined'){
        return true;
    }
    // null
    if (!obj && obj != 0 ){
        return true;
    }
    if(obj instanceof Array && obj.length == 0){
        return true;
    }
    return false;
}