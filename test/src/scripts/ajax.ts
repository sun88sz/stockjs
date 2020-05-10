//1.定义 ajax 请求所需的参数接口
interface IAjaxConfig {
    type: string;
    url: string;
    data?: string;
    dataType: string;
}

//2.定义 CRUD 对应的抽象方法
abstract class TsAjax {
    abstract _post(url: string, data?: string): any;

    abstract _put(url: string, data?: string): any;

    abstract _delete(url: string, data?: string): any;

    abstract _get(url: string, data?: string): any;
}

//3.继承抽象类并实现抽象类抽象方法，封装原生 ajax [CRUD]
class Ajax extends TsAjax {
    //原生js封装的ajax
    private doAjax(config: IAjaxConfig): any {
        let result: any = "";

        let xhr = new XMLHttpRequest();

        if (xhr == null) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");  /* 老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象： */
        }

        if (xhr != null) {
            xhr.open(config.type, config.url, true);
            xhr.send(config.data);
            xhr.onreadystatechange = function () {
                console.log(xhr.statusText);
                let data = xhr.responseText;
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (config.dataType == 'json') {
                        result = JSON.parse(data);
                    } else {
                        result = data;
                    }
                } else {
                    result = data; //error
                }
            }
        } else {
            result = "Your browser does not support XMLHTTP.";
        }
        console.log(result);
        alert(result);
        return result;
    }

    _post(url: string, data?: any): any {
        return this.doAjax({
            type: 'post',
            data: data,
            url: url, //api
            dataType: 'json'
        });
    }

    _delete(url: string, data?: any): any {
        return this.doAjax({
            type: 'delete',
            data: data,
            url: url, //api
            dataType: 'json'
        });
    }

    _put(url: string, data?: any): any {
        return this.doAjax({
            type: 'put',
            data: data,
            url: url, //api
            dataType: 'json'
        });
    }

    _get(url: string, data?: any): any {
        return this.doAjax({
            type: 'get',
            data: data,
            url: url, //api
            dataType: 'json'
        });
    }
}
const hello : string = "Hello World!"
console.log(hello)


let myAjax = new Ajax();
let d = myAjax._get("http://127.0.0.1:8080/stock/all",{code:'601066'});


