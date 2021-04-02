import React from "react";

class LocalCache {
    constructor() {}

    store(key,val){
        console.log("Se va a almacenar una variable ... " + key + " --> " + val);
        var curcache = {};
        try {
            curcache = localStorage.getItem('localcache');
            curcache[key] = val
        }catch (error) {
            curcache = {};
            curcache[key] = val;
            console.log(curcache);
        }
        localStorage.setItem('localcache', JSON.stringify(curcache))
    }

    getKey(key){
        try {
            var rval = JSON.parse(localStorage.getItem('localcache'))
            console.log(rval)
            return rval[key]
        }catch (error) {
            return ''
        }

    }

}

export default LocalCache;