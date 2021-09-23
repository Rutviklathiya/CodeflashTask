const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
const data_buffer = fs.readFileSync(path.join(__dirname,'/task_data.json')); // path of the downloaded jsonfile
const data = JSON.parse(data_buffer);

const csvWriter = createCsvWriter({
    path: path.join(__dirname,'file.csv'),
    header: [
        {id: 'first_name', title: 'Name'},
        {id: 'username', title: 'Username'},
        {id: 'email', title: 'Email'},
        {id: 'phone_number', title: 'Phone_number'},
        {id: 'birthdate', title: 'Date_of_birth'},
        {id: 'location', title: 'Address'},
    ]
})

var records = [];
for(let i = 0; i < data.length; i++) {
records.push(
    {
        'first_name': data[i].title +' '+ data[i].first_name +' '+ data[i].last_name, 
        'username': data[i].username, 
        'email': data[i].email,
        'phone_number':data[i].phone_number, 
        'birthdate': data[i].birthdate,
        'location': data[i].location.street +' '+data[i].location.city+' '+data[i].location.state+' '+data[i].location.postcode 
    })    
};
console.log(records);

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    })
    .catch((err)=>{
        console.log('Writing records to excel file is failed due to',err)
    });