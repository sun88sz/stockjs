var Ajax = /** @class */ (function () {
    function Ajax(url, headers) {
        this.url = url;
        this.headers = headers;
    }
    Ajax.prototype.sentData = function (data) {
        var str = '?';
        for (var i in data) {
            str += i + "=" + data[i] + "&";
        }
        return str.slice(0, str.length - 1);
    };
    Ajax.prototype.get = function (url, data, fun) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.url + url + this.sentData(data));
        if (this.headers) {
            for (var i in this.headers) {
                xhr.setRequestHeader(i, this.headers[i]);
            }
        }
        xhr.send();
        xhr.onreadystatechange = function () {
            var result = "";
            console.log(xhr.statusText);
            var data = xhr.responseText;
            if (xhr.readyState == 4 && xhr.status == 200) {
                result = data;
            }
            else {
                result = data; //error
            }
            fun(result);
        };
    };
    Ajax.prototype.post = function (url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.url + url);
        if (this.headers) {
            for (var i in this.headers) {
                xhr.setRequestHeader(i, this.headers[i]);
            }
        }
        xhr.send(JSON.stringify(data));
    };
    return Ajax;
}());
function getStockData(code) {
    // let $ = new Ajax('https://www.baidu.com', { 'Content-Type': 'application/x-www-form-urlencoded' })
    var $ = new Ajax('http://127.0.0.1:8080/stock', { 'Content-Type': 'text/plain' });
    $.get('/all', { code: code }, setData);
    // $.post('/bar', { name: 'lucy', age: 16 })
}
function setData(data) {
    document.getElementById("totalMessage").innerText = data;
}
