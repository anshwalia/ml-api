'use strict';

function create_endpoint_display_card(title,endpoint,description){
    return new Promise((resolve,reject) => {
        try{
            const newCard = document.createElement("div");
            newCard.classList.add("card","col-3","p-0");
            newCard.innerHTML = `
                <div class="card-header p-3 custom-orange">
                    <h1>${title}</h1>
                    <p class="heading m-0" title="API Endpoint">${endpoint}</p>
                </div>
                <div class="card-body p-3">
                    <h4 class="heading m-0">${description}</h4>
                </div>
                <div class="card-footer d-flex justify-content-center p-3">
                    <button type="button" class="btn btn-primary">Test</button>
                </div>
            `;
            resolve(newCard);
        }
        catch(error){ reject(error); }
    });
}