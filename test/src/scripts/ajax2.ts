class Ajax {
    private url: string;
    private headers: any;

    constructor(url, headers) {
        this.url = url
        this.headers = headers
    }

    get(url, data) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', this.url + url + sentData(data))

        if (this.headers) {
            for (let i in this.headers) {
                xhr.setRequestHeader(i, this.headers[i])
            }
        }

        xhr.send()

        function sentData(data) {
            let str = '?'
            for (let i in data) {
                str += `${i}=${data[i]}&`
            }
            return str.slice(0, str.length - 1)
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

// let $ = new Ajax('https://www.baidu.com', { 'Content-Type': 'application/x-www-form-urlencoded' })
let $ = new Ajax('127.0.0.1:8080/stock', { 'Content-Type': 'text/plain' })
$.get('/all', { code: '601066' })
// $.post('/bar', { name: 'lucy', age: 16 })