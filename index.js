// variables to get data from user

let username = document.getElementById('username');
let empid = document.getElementById('empid')
let email = document.getElementById('email');
let mobile = document.getElementById('mobile');
let address = document.getElementById('address');
var userdata = document.getElementById('userdata');
let msg = document.getElementById('msg');
let form = document.getElementById('form');
let table = document.getElementById('table');

//to submit form

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('Submit success');
    userValidation();
})

//to check user validation

let userValidation = ()=>{
    if(username.value === ''){
        msg.innerHTML = "Please Enter User Name...!";
    }else{
        msg.innerHTML = '';
        acceptUserData();
    }
}

//Empty array to store data

let data = [];

//Accept data and store in data array & localstorage

let acceptUserData = ()=>{
    data.push({
        UserName : username.value,
        Employee_ID : empid.value,
        Email : email.value,
        Mobile : mobile.value,
        Address : address.value
    });
    // console.log("User Data =",data);

    localStorage.setItem('data',JSON.stringify(data));
    createUserData();
}

//Create table after data added in localstorage

let createUserData = ()=>{
    userdata.innerHTML = '';

    if(data.length === 0){
        userdata.innerHTML +=
            `            
            <tr>
            <h5 class="text-danger">No Data..</h5>
            </tr>            
            `
    }else{
        data.map((x,y)=>{
            return(
                userdata.innerHTML +=
                `            
                <tr id="${y}">
                <td>${y+1}</td>
                <td>${x.Employee_ID}</td>
                <td>${x.UserName}</td>
                <td>${x.Email}</td>
                <td>${x.Mobile}</td>
                <td>${x.Address}</td>
                <td><i onClick="updateData(this)" class="fas fa-edit ms-4"></i>
                <i onClick="deleteData(this)" class="fas fa-trash-alt ms-4"></i></td>
                </tr>            
                `
            )
        })
    }
    
    resetForm();
}

//reset form after submit

resetForm = ()=>{
    username.value = '';
    empid.value = '';
    email.value = '';
    mobile.value = '';
    address.value = '';
}

//delete data

let deleteData = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem('data',JSON.stringify(data));
} 

//Update data

let updateData = (e)=>{
    let selectedData = e.parentElement.parentElement;

    empid.value = selectedData.children[1].innerHTML;
    username.value = selectedData.children[2].innerHTML;
    email.value = selectedData.children[3].innerHTML;
    mobile.value = selectedData.children[4].innerHTML;
    address.value = selectedData.children[5].innerHTML;

    deleteData(e);
}


// Load Data from localstorage when page loads

(()=>{
    data = JSON.parse(localStorage.getItem('data')) || data; // || data - without this also same result
    createUserData();
})();


//Serach Function

function searchFunction() {
    let input = document.getElementById('myInput');
    let filter = input.value.toUpperCase();
    let tr = userdata.getElementsByTagName("tr");

    for(var i = 0;i < tr.length ; i++){
        let td = tr[i].getElementsByTagName("td")[2];

        if(td){
            textValue = td.textContent || td.innerText;
            if(textValue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = '';
            }else{
                tr[i].style.display = "none";
            }
        }
    }
}


