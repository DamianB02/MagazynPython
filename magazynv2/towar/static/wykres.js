$(document).ready(function () {
	$.ajax({
		url:"daneWykres",
		type:"POST",
		dataType:"json",
		success: function(data){
			var licznikU=1;
			var licznikD=1;
			var iloscU=0;
			var iloscD=0;
			var daneU=[];
			var daneD=[];
			var staradata;
			for(var i=0;i<data.length;i++){
				console.log("petle:"+i);
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
					console.log("firstDate"+firstdate);
					console.log("NextDate"+nextdate);
					if(formatDate(firstdate)==formatDate(nextdate)){
						console.log("rowne");
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
					console.log("firstDate"+firstdate);
					console.log("NextDate"+nextdate);
					if(formatDate(firstdate)==formatDate(nextdate)){
						if(data[i].fields.action=="Usuniecie"){
							iloscU++;
							daneU[licznikU-1]=[nextdate,iloscU];
							console.log("IloscU zwiekszone"+iloscU);
						}
						else{
							iloscD++;
							daneD[licznikD-1]=[nextdate,iloscD];
							console.log("IloscD zwiekszone"+iloscD);
						}
					}
					else
					{
						if(data[i].fields.action=="Usuniecie")
						{
							console.log(licznikU);
							console.log("IloscU"+iloscU);
							licznikU++;
							iloscU=1;
							console.log("iloscU"+iloscU);
							console.log(nextdate);
						}
						else{
							console.log(licznikD);
							console.log("IloscD"+iloscD);
							licznikD++;
							iloscD=1;
							console.log("iloscD"+iloscD);
							console.log(nextdate);
						}
					}
				}
				}
				console.log(licznikU);
				console.log(licznikD);
				console.log(daneD);
				console.log(daneU);
			
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
				        xaxis: { 
				        	mode: "time",
				        	minTickSize: [1, "day"],
				        	timeformat: "%y/%m/%d"
				        	}
				    	};
			$.plot($("#placeholder"), dataset, options);
			
		}
	});
	
});


function formatDate(data){
	day= data.getDate();
	month = data.getMonth();
	year = data.getFullYear();
	return year+"/"+month+"/"+day
}

function zero(liczba) {
    return liczba=(liczba < 10)? "0"+liczba : liczba;
};


function onSuccess(resp){
//	console.log(resp);
	
	
	 
	var dataset = [
	    {
	        label: "dodawanie",
	        data: data
	    },
	    {
	    	  label: "usuwanie",
	    	  data: datav1
	    }
	];
	var options = {
		    series: {  
		        lines: { show: true },      
		        points: {
		            radius: 3,
		            show: true
		        }
		    }
		};
	$.plot($("#placeholder"), dataset, options);
};
    


