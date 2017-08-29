$(document).ready(function () {
	if( x =document.getElementById( 'placeholder' ) ){
		$.ajax({
			url:"daneWykres",
			type:"POST",
			dataType:"json",
		}).done(success);
	}
	
});


function success(data){
	var licznikU=1;
	var licznikD=1;
	var iloscU=0;
	var iloscD=0;
	var daneU=[];
	var daneD=[];
	var staradata;
	for(var i=0;i<data.length;i++){
		if(i==0){
			var firstdate = new Date(data[i].fields.data_action);
			if(data[i].fields.action=="Usuniecie")
			{
				iloscU++;
				daneU[licznikU-1]=[firstdate,iloscU];
			}
			else{
				iloscD++;
				daneD[licznikD-1]=[firstdate,iloscD];
			}
		}
		else if(i==data.length-1)
		{
			var firstdate = new Date(data[i-1].fields.data_action);
			var nextdate = new Date(data[i].fields.data_action);
			if(formatDate(firstdate)==formatDate(nextdate)){
				if(data[i].fields.action=="Usuniecie")
				{
					iloscU++;
					daneU[licznikU-1]=[nextdate,iloscU];
				}
				else{
					iloscD++;
					daneD[licznikD-1]=[nextdate,iloscD];
				}
			}
			else{
				if(data[i].fields.action=="Usuniecie")
				{
					iloscU=1;
					licznikU++;
				}
				else{
					licznikD++;
					iloscD=1;
				}
			}
			
		}
		else{
			
			var firstdate = new Date(data[i-1].fields.data_action);
			var nextdate = new Date(data[i].fields.data_action);
			if(formatDate(firstdate)==formatDate(nextdate)){
				if(data[i].fields.action=="Usuniecie"){
					iloscU++;
					daneU[licznikU-1]=[nextdate,iloscU];
				}
				else{
					iloscD++;
					daneD[licznikD-1]=[nextdate,iloscD];
				}
			}
			else
			{
				if(data[i].fields.action=="Usuniecie")
				{
					licznikU++;
					iloscU=1;
				}
				else{
					licznikD++;
					iloscD=1;
				}
			}
		}
		}
	
	var dataset = [
	    {
	        label: "dodawanie",
	        data: daneD
	    },
	    {
	    	  label: "usuwanie",
	    	  data: daneU
	    }
	];
	var options = {
		    series: {  
		        lines: { show: true },      
		        points: {
		            radius: 3,
		            show: true
		        	}
		    	},
		    	yaxis: {
		    		minTickSize: 1
		    	},
		        xaxis: { 
		        	mode: "time",
		        	minTickSize: [1, "day"],
		        	timeformat: "%y/%m/%d"
		        	}
		    	};
	$.plot($("#placeholder"), dataset, options);
	

	
};

function formatDate(data){
	day= data.getDate();
	month = data.getMonth();
	year = data.getFullYear();
	return year+"/"+month+"/"+day
}

function zero(liczba) {
    return liczba=(liczba < 10)? "0"+liczba : liczba;
};



    


