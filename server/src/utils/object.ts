export function pick<T extends Record<string,any>, S extends readonly (keyof T)[]>(obj: T, fields: S) {
    const newObj: Record<string,any> = {};
    for(const key in obj)
        if(fields.includes(key))
            newObj[key] = obj[key];
    
    return newObj as Pick<T,S[number]>
}

export function omit<T extends Record<string,any>, S extends readonly (keyof T)[]>(obj: T, fields: S) {
    const newObj: Record<string,any> = {};
    for(const key in obj)
        if(!fields.includes(key))
            newObj[key] = obj[key];
    
    return newObj as Omit<T,S[number]>
}


