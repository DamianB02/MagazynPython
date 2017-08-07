$(document).ready(function () {
	$.ajax({
		url:"daneWykres",
		type:"POST",
		dataType:"json",
		success: function(data){
			var licznikU=1;
			var licznikD=1;
			var daneU=[];
			var daneD=[];
			for(var i=0;i<data.length;i++){
				if(data[i].fields.action=="Usuniecie"){
					var dd = new Date(data[i].fields.data_action);
					daneU[licznikU-1]=[dd,licznikU];
					licznikU++;
				}
				else{
					var dd = new Date(data[i].fields.data_action);
					daneD[licznikD-1]=[dd,licznikD];
					licznikD++;
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
				        xaxis: { 
				        	mode: "time",
				        	minTickSize: [1, "day"],
				        	timeformat: "%d/%m/%y"
				        	}
				    	};
			$.plot($("#placeholder"), dataset, options);
			
		}
	});
	
});


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
    


