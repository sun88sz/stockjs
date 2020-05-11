export class Ajax {
    private url: string;
    private headers: any;

    constructor(url, headers) {
        this.url = url
        this.headers = headers
    }

    private sentData(data: any) {
        let str = '?'
        for (let i in data) {
            str += `${i}=${data[i]}&`
        }
        return str.slice(0, str.length - 1)
    }

    get(url: string, data, fun) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', this.url + url + this.sentData(data))

        if (this.headers) {
            for (let i in this.headers) {
                xhr.setRequestHeader(i, this.headers[i])
            }
        }

        xhr.send()

        xhr.onreadystatechange = function () {
            let result: any = "";
            console.log(xhr.statusText);
            let data = xhr.responseText;
            if (xhr.readyState == 4 && xhr.status == 200) {
                result = data;
            } else {
                result = data; //error
            }
            fun(result);
        }

    }

    post(url, data) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', this.url + url)

        if (this.headers) {
            for (let i in this.headers) {
                xhr.setRequestHeader(i, this.headers[i])
            }
        }

        xhr.send(JSON.stringify(data))
    }
}

function getStockData(code: string) {
    // let $ = new Ajax('https://www.baidu.com', { 'Content-Type': 'application/x-www-form-urlencoded' })
    let $ = new Ajax('http://127.0.0.1:8080/stock', {'Content-Type': 'text/plain'})
    $.get('/all', {code: code}, setData);
// $.post('/bar', { name: 'lucy', age: 16 })
}

function setData(data) {
    document.getElementById("totalMessage").innerText = data;
}
