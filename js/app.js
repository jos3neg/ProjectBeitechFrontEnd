

function saveToLocalStorage(){
    $.ajax({
        url: 'http://127.0.0.1:8000/api/customers',
        type: 'GET',
        success: function (data) {
            localStorage.setItem("data", JSON.stringify(data));   
        }
    });
}

function showOrders(){
    document.getElementById("t-body").innerHTML = "";
    var customer_id = document.getElementById('customer_id').value;
    var date_from = "";
    var date_to = "";    

    document.getElementById('date_from').value ? date_from = document.getElementById('date_from').value : date_from = "2018-03-12";
    document.getElementById('date_to').value ? date_to = document.getElementById('date_to').value : date_to = "2018-04-12";
        
    $.ajaxSetup({ cache: false });
    $.ajax({
        url: 'http://127.0.0.1:8000/api/orders/bycustomer',
        type: 'POST',
        data:{
            "customer_id" : customer_id,
            "date_from" : date_from,
            "date_to" : date_to
        },
        success: function (data) {
            console.log(data);
            console.log("dd:" + data.data);
            var details ="";
            $.each(data.data, function(key,value){
                details = "<ul>";
                $.each(value.order_details,function(key_i,value_i){
                    details += "<li>"+ value_i.product_description +"</li>";
                });
                details += "</ul>";
                
                document.getElementById("t-body").innerHTML += '<tr><td>'+ value.creation_date +'</td><td>'+ value.id +'</td><td>$ '+ value.total +'</td><td>'+ value.delivery_address+'</td><td>'+ details+'</td></tr>'; 
                details = "";
            });
        }
    });
}    