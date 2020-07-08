/* ########## REQUETE PRINCIPALE ########## */

class Request { 
    constructor() {
        this.request = new XMLHttpRequest; 
    }

    get(url) {
        this.request.open("GET", url, true); 
        const promise = new Promise((resolve, reject) =>{
            this.request.onreadystatechange = function(){
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
                    resolve(this.responseText) 
                }
                if (this.status >399) { 
                    reject(); 
                }
            };
        }); 
        this.request.send(); 
        return promise 
    }

    post(url, body){
        this.request.open("POST", url); 
        this.request.setRequestHeader("Content-Type", "application/JSON"); 
        const promise = new Promise((resolve, reject) => { 
            this.request.onreadystatechange = function(){ 
                if (this.readyState == XMLHttpRequest.DONE && this.status >= 200 && this.status <= 300) {
                    resolve(this.responseText) 
                }
                if (this.status >399) { 
                    reject(); 
                }
            };
        });
        this.request.send(JSON.stringify(body)); 
        return promise 
    } 
}
