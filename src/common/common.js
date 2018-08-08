
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

export function sleep(numberMillis) { 
    var now = new Date(); 
    var exitTime = now.getTime() + numberMillis; 
    while (true) { 
        now = new Date(); 
        if (now.getTime() > exitTime){
            return; 
        }
    } 
}

export function searchESData(cValue,iValue,dValue,params){
    let result = {cValue:cValue,iValue:iValue,dValue:dValue,params:params}
    let esParams = {}
    return result
}