
const SELECT = "select"
const FROM = "from"
const WHERE = "where"

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

