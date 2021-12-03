import config from '../config/server';
import { response } from '../utils/responseStatusCodeUtil';
export default class CoreService {

    makeRequest(url, _options) {
        return new Promise((resolve, reject) => {
            let reqUrl = config.urlUser + url;
            let options = {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                }
            }
            if (_options) {
                options = this.mergeObject({}, options, _options);
            }
            this.fetch(reqUrl, options)
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
        });
    }

    fetch(reqUrl, options) {
        return new Promise((resolve, reject) => {
            return fetch(reqUrl, options)
                .then(res => res.json())
                .then(res => {
                    if (res.status !== 200) {
                        reject(response(res.status));
                    } else {
                        resolve(res);
                    }
                }).catch(error => reject(error))
        })
    }

    mergeObject(target) {
        let sources = [].slice.call(arguments, 1);

        sources.forEach(function (source) {
            for (let propertyName in source) {
                if (target[propertyName] !== undefined && typeof target[propertyName] === 'object' && !(target[propertyName] instanceof Array)) {
                    target[propertyName] = { ...target[propertyName], ...source[propertyName] };
                } else {
                    target[propertyName] = source[propertyName];
                }
            }
        });

        return target;
    }
}