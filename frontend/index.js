'use strict';

// Static Data
const base_API_URL = "http://localhost:5000";

// Document Objects
const contentBox = document.querySelector("#content-box");

function get_API_endpoint_data(){
    return new Promise((resolve,reject) => {
        try{
            const request = fetch(base_API_URL);
            request
            .then((res) => { return res.json(); })
            .then((data) => { resolve(data); })
            .catch((error) => { throw error; });
        }
        catch(error){ reject(error); }
    });
}

function display_active_api_endpoints(api_data){
    for(let i = 0; i < api_data.length; i++){
        if(api_data[i].active === true){
            const { title, endpoint, description } = api_data[i];
            create_endpoint_display_card(title,endpoint,description)
            .then((display_card) => { contentBox.appendChild(display_card); })
            .catch((error) => { console.error(error); });
        }
    }
}

get_API_endpoint_data().then((data) => {
    display_active_api_endpoints(data.api_endpoints);
}).catch((error) => { console.log(error); });