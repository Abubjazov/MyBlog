export class ParseService {
    static fbObjToArray(fbData) {
        
        return Object.keys(fbData).map(key => {
            const item = fbData[key]
            item.id = key
            
            return item
        })
    }
}
