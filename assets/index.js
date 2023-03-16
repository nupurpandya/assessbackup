let btn = document.getElementById("buttonadd");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let fname = document.getElementById("fname").value;
  let fnameregEx = /^[A-Za-z]{3,25}$/;
  if (fname == "") {
    document.getElementById("fnametext").innerHTML = "Please enter name";
  } else if (!fname.trim().match(fnameregEx)) {
    document.getElementById("fnametext").innerHTML =
      "please enter valid first name";
  } else {
    document.getElementById("fnametext").innerHTML = "";
  }
  let desc = document.getElementById("desc").value;
  let descregEx = /^[A-Za-z0-9\s]{3,150}$/;
  if (desc == "") {
    document.getElementById("desctext").innerHTML = "Please enter description";
  } else if (!desc.trim().match(descregEx)) {
    document.getElementById("desctext").innerHTML = "Max 250 Characters";
  } else {
    document.getElementById("desctext").innerHTML = "";
  }
  let status = document.getElementById("statusselect").value;
  if (status == "Status") {
    document.getElementById("statustext").innerHTML = "Please select one value";
  } else {
    document.getElementById("statustext").innerHTML = "";
  }
  let rate=document.getElementById("rate").value;
  let rateregEx=/^[0-9$]*$/;
  if(rate ==""){
      document.getElementById("ratetext").innerHTML="Please enter rate";
  }
  else if(!rate.trim().match(rateregEx)){
      document.getElementById("ratetext").innerHTML="Only Numeric";
      
  }
  else
  {
      document.getElementById("ratetext").innerHTML="";
     
  }
  let balance = document.getElementById("balance").value;
  let balanceregEx = /^[0-9$\-]*$/;
  if (balance == "") {
    document.getElementById("balancetext").innerHTML =
      "Please enter value for balance";
  } else if (!balance.trim().match(balanceregEx)) {
    document.getElementById("balancetext").innerHTML =
      "Enter only numeric data";
  } else {
    document.getElementById("balancetext").innerHTML = "";
  }
  let deposit = document.getElementById("deposit").value;
  let depositregEx = /^[0-9$]*$/;
  if (deposit == "") {
    document.getElementById("deposittext").innerHTML =
      "Please enter value for deposit";
  } else if (!deposit.trim().match(depositregEx)) {
    document.getElementById("deposittext").innerHTML =
      "Enter only numeric data";
  } else {
    document.getElementById("deposittext").innerHTML = "";}

  if (
    fnametext.innerHTML == "" &&
    desctext.innerHTML == "" &&
    statustext.innerHTML == "" &&
    ratetext.innerHTML=="" &&
    balancetext.innerHTML=="" &&
    deposittext.innerHTML==""){
    let firstName = document.getElementById("fname").value;
    let descValue = document.getElementById("desc").value;
    let statusValue = document.getElementById("statusselect").value;
    let rateValue = document.getElementById("rate").value;
    let balanceValue = document.getElementById("balance").value;
    let depositValue = document.getElementById("deposit").value;
   
    fetch("http://localhost:3000/validate", {
      method: "POST",
      body: JSON.stringify({
        fname:firstName,
        desc:descValue,
        statusselect:statusValue,
        rate:rateValue,
        balance:balanceValue,
        deposit:depositValue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    
  }
  // if(document.getElementById("selectstatus").value=="open"){
  //   document.getElementById("selectstatus").value.style.color="red";
  // }
});
let headers=[{header:"#",key:"id"},{header:"Name",key:"fname"},{header:"Description",key:"desc"},{header:"Status",key:"statusselect"},{header:"Rate",key:"rate"},{header:"Balance",key:"balance"},{header:"Deposit",key:"deposit"}];
let table=document.createElement("table");
table.classList.add("table-class-design");
table.setAttribute("id","tableid");
console.log(table);
let thead=table.createTHead();
let thr=thead.insertRow();
for (const iterator of headers) {
  let th=document.createElement("th");
  thr.appendChild(th);
  let thtext=document.createTextNode(iterator.header);
  th.appendChild(thtext);
  
}
let ath=document.createElement("th");
let atext=document.createTextNode("Action");
ath.appendChild(atext);
thr.appendChild(ath);
let tbody=table.createTBody();
fetch("http://localhost:3000/validate").then((response)=>response.json()).then((data)=>{
    createTableMain(data)
}).catch((error)=>console.error(error));
let body=document.querySelector("body");
body.append(table);


function createTableMain(data){
  for (const element of data) {
    // console.log(iterator);
    let tr=tbody.insertRow();
    for (const iterator of headers) {
        let cell=tr.insertCell();
       
        let text=document.createTextNode(element[iterator["key"]]);+
        cell.appendChild(text);
    }
    let atd=tr.insertCell();
    tr.appendChild(atd);
    let btnedit=document.createElement("button");
    btnedit.classList.add("btneditdecor");
    let btnedittext=document.createTextNode("Edit");
    btnedit.appendChild(btnedittext);
    let btndelete=document.createElement("button");
    btndelete.classList.add("btndeletedecor");
    let btndeletetext=document.createTextNode("Delete");
    btndelete.appendChild(btndeletetext);
    atd.appendChild(btnedit);
    atd.appendChild(btndelete);
    btndelete.addEventListener("click",deleteStudent);
    function deleteStudent() {
    fetch(`http://localhost:3000/validate/${element.id}`,{
        method:"DELETE"
    })}
    btnedit.addEventListener("click",()=>{

      document.getElementById("fname").value=element.fname;
      document.getElementById("desc").value=element.desc;
      document.getElementById("statusselect").value=element.statusselect;
      document.getElementById("rate").value=element.rate;
      document.getElementById("balance").value=element.balance;
      document.getElementById("deposit").value=element.deposit;
      let updatedata=document.getElementById("updatebtn");
      updatedata.addEventListener("click",editData);
      function editData() {
          
          fetch(`http://localhost:3000/validate/${element.id}`,{
              method:"PUT",
              body:JSON.stringify({fname:document.getElementById("fname").value,desc:document.getElementById("desc").value,statusselect:document.getElementById("statusselect").value,rate:document.getElementById("rate").value,balance:document.getElementById("balance").value,deposit:document.getElementById("deposit").value}),
              headers:{
                  "Content-type": "application/json; charset=UTF-8"
              }
          })
       
      }
  });
}
}

function searchFunction(){
  let filter=document.getElementById("searchinput").value.toUpperCase();
  //touppercase left
  let mytable=document.getElementById("tableid");
  let tr=mytable.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
      let td=tr[i].getElementsByTagName("td")[3];
     
      if(td){
          let text=td.innerHTML || td.textContent;
          if(text.toUpperCase().indexOf(filter)>-1){
              tr[i].style.display="";
          }
          else{
              tr[i].style.display="none";
          }
      }

  }

}
searchFunction();


function filterRecords(){
  let selectinput=document.getElementById("filterr");
  fetch("http://localhost:3000/validate").then((response)=>response.json()).then((data)=>{ 
    let filter = data.filter(item=>item.statusselect==selectinput.value||selectinput.value=="Status")
    tbody.innerHTML=""
     createTableMain(filter)
  })
}

