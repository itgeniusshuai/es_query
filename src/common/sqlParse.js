
const SELECT = "select"
const FROM = "from"
const WHERE = "where"
const AND = "and"
const OR = "or"
const LIKE = "like"
const IN = "in"

export function parseSql(sql){
    let res = {}
    sql = sql.toLowerCase().trim()

    if(sql.indexOf(SELECT) < 0 || sql.indexOf(FROM) < 0 || sql.indexOf(WHERE) < 0)

    if(sql.indexOf(SELECT) != 0 ){
        res.success = false;
        return res;
    }
    // 去除select
    sql = sql.replace(SELECT,"").trim()
    // 切分字符串，获取返回列
    let sqlArr = sql.split(FROM)
    if(sqlArr == undefined || len(sqlArr)< 2){
        res.success = false
        return res
    }
    // from前面是列名
    let fieldsStr = sqlArr[0]
    // 去除括弧
    fieldsStr = fieldsStr.replaceAll(/[\(\)\s]/,"")
    let fields = fieldsStr.split(",")
    if(len(fields)<=1){
        res.success = false;
        return res;
    }
    
    fields = fields.map(x => x.trim())
    res.fileds = fields

    // 解析索引名
    let nameAndWhereArr =  sqlArr[1].split(WHERE)
    let indexName = nameAndWhereArr[0].trim()
    res.indexName = indexName
    // 解析where条件
    let whereStr  = nameAndWhereArr[1].trim()

    res.success = true
    return res

}

function parseWhere(whereStr){
    let conditionObj = {}
    // 解析最外层
    whereStr = whereStr.trim()
    let leftIndex = whereStr.indexOf("(")
    // 去除最外层的括号如果有
    if(whereStr.indexOf("(") == 0 ){
       let whereLength =  whereStr.length
       if(whereStr.lastIndexOf(")") != whereLength - 1){
            return whereCond
       }
       whereStr = whereStr.substring(1,whereLength - 1)
    }

    // 解析条件
    // 获取第一个and或者or
    let andIndex = whereStr.indexOf(AND)
    let orIndex = whereStr.indexOf(OR)
    if(andIndex < 0 &&  orIndex < 0){
        let andList = []
        andList.push(parseSubWhere(whereStr))
        conditionObj.andList = andList
        return conditionObj
    }
    if(andIndex < 0 && orIndex > 0){
        let orList = []
        let orStr = whereStr.substring(0,orIndex)

        orList.push(parseWhere)
    }
    if(andIndex > 0 && orIndex < 0){
        let andList = []
        let orStr = whereStr.substring(0,orIndex)
        andList.push(parseWhere)
    }
    if(andIndex > 0 && orIndex > 0){
        let orList = []
        let orStr = whereStr.substring(0,orIndex)
        orList.push(parseWhere)
    }
    // if(leftIndex < 0 ){
    //     // 单层无嵌套
    //     let whereArr = whereStr.split(/[(and)(or)]/)
    //     conditionArr = whereArr.map(x => parseSubWhere(x))
    //     whereCond.conditionArr = conditionArr
    //     return whereCond
    // }else{

    // }


    return whereCond
}

function parseSubWhere(subWhereStr){
    let surWhere = {}
    conArr = subWhereStr.split(/\s+/)
    
    surWhere.condition = conArr[1]
    if(conArr == 'in'){
        surWhere.value = conArr[2].trim().replaceAll(/[\(\)]/,"")
    }else{
        surWhere.value = conArr[2].trim()
    }
    surWhere.filedName = conArr[0]
    return surWhere
}

// 将where条件转换乘逆波兰
export function toNiBolan(whereStr){
    
    let res = {}
    let niBolan = []
    let stack = []
    // 将每个单独条件作为一个操作数 and/or 作为操作符号／()将and/or替换为&／|
    whereStr = whereStr.replace(/(and)/g,"&")
    whereStr = whereStr.replace(/(or)/g,"|")
    whereStr += "$"
    niBolan.push("")
    whereStr = whereStr.split("")
    let ch = whereStr.shift()
    let topCh = ""
    let lastInCurve = false
    let inReg = /.*in\s*$/
    while(ch != "$"){
        switch(ch){
            case "(":
                if(inReg.test(niBolan[niBolan.length - 1])){
                    niBolan.push(niBolan.pop()+ch)
                    lastInCurve = true;
                    break;
                }
                stack.push(ch)
                break;
            case ")":
                if(lastInCurve){
                    niBolan.push(niBolan.pop()+ch)
                    lastInCurve = false;
                    break;
                }
                niBolan.push("")
                // 输出直到遇到左括弧，如果棧都为空了还没遇到左括弧，那么格式不对报错
                if(stack.length == 0){
                    res.errorMsg = "格式不对"
                    return res
                }
                topCh = stack.pop() 
                while(topCh != "("){
                    if(stack.length == 0){
                        res.errorMsg = "格式不对"
                        return res
                    }
                    niBolan.push(niBolan.pop()+topCh)
                    topCh = stack.pop()
                }
                break;
            case "&":
            case "|":
                niBolan.push("")
                // 如果棧为空直接入棧
                if(stack.length == 0){
                    stack.push(ch)
                    break;
                }
                // 如果不为空则比较优先级,如果当前大，入站，否则退棧输出,该情况只有同级直接退棧输出
                topCh = stack.pop()
                while( topCh != '('){
                    niBolan.push(niBolan.pop()+topCh)
                    if(topCh == '&' || topCh == '|'){
                        niBolan.push("")
                    }
                    if(stack.length == 0){
                        break;
                    }
                    topCh = stack.pop()
                }
                if(topCh == '('){
                    stack.push("(")
                }
                stack.push(ch)
                break;
            default:
                niBolan.push(niBolan.pop()+ch)

        }
        ch = whereStr.shift()
    }
    while(stack.length != 0 ){
        ch = stack.pop()
        if(ch == '&' || ch == '|'){
            niBolan.push("")
        }
        niBolan.push(niBolan.pop()+ch)
        
    }
    niBolan = niBolan.map(x => x.trim())
    res.niBolan = niBolan
    return res
}

function niBolanToEsQueryJson(niBolan){
    // 多个空格变成单个
    let conditionArr = niBolan.split(/[\s+]/,' ')
    ch = conditionArr.pop()
    let stack = []
    while(ch){
        switch(ch){
            case '&':               
            case '|':
                stack.push(ch)
                break;
            default:
                //let subWhere = parseSubWhere(ch)

        }
        ch = conditionArr.pop()
    }

    
}


