import request from 'superagent';
import { parse as urlParse } from 'url';

function sendRequest(r, callback, failure, timeout = 15000) {
    const url = r.url;
    failure = failure || empty;

    requests.push(r);
    r.on('abort', function() {
        if (r.eventFired == true) return;
        requests.splice(requests.indexOf(r), 1);
        failure({
            error: undefined,
            request: r,
            response: undefined,
            message: undefined,
            abort: true
        });
        r.eventFired = true;
    });
    return r.timeout(timeout).end(function (error, response) {
        if (r.eventFired == true) return;
        requests.splice(requests.indexOf(r), 1);

        if (!error) {
            if (!!response.body && response.body.code == 200) {
                callback(response.body);
            } else if (!!response.body && response.body.code == 712) {
                window.location.href = '/html/login.html';
            } else {
                /* eslint-disable */
                console.error(`调用${url}失败，服务器返回代码${response.status}`, response);
                /* eslint-enable */
                failure({
                    error,
                    request: r,
                    response,
                    message: response.body.msg
                });
                r.eventFired = true;
            }
        } else {
            /* eslint-disable */
            console.error(`调用${url}失败，${error.message}，HTTP代码${error.status}`, error, response);
            /* eslint-enable */
            failure({
                request: r,
                error, 
                response,
                message: error.message
            });
            r.eventFired = true;
            const parsedUrl = urlParse(url, {get: true});
            const reportContent = {
                pathname: parsedUrl.pathname,
                retry: parsedUrl.query.retry,
                login_key: parsedUrl.query.login_key,
                message: error.message
            };
            remoteLog(r.timedout ? 'ajax timeout' : 'ajax error', parseInt(parsedUrl.query['_']), reportContent);
        }
    });
}

export {
    sendRequest
}