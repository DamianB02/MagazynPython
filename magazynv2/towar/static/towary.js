function init()
	{
	
	$(".remove-button").on("click", onRemoveClick);
	
	$("#formHasloUzytkownik").on("click",onZmianaHasla);
	
	$("#formDodajTowar").on("click",onDodajTowarClick);
	
	$("#formDaneUzytkownik").on("click",onEdycjaDaneUzytkownika);
	
	$("#formLogin").on("click",onLogowanie);
	
	$("#wyloguj").on("click",onWyloguj);
	}

function onRemoveClick(e){
	var $this = $(this);
	var $tr = $this.parents("tr");
	var id = $tr.attr("element-id");
	var date={};
	date["id"]=id;
	$.ajax({
		url: "remove",
		type: "POST",
		data: date
	}).done(onRemoveClickSuccess);
};

function onRemoveClickSuccess(resp){
	if (resp=="OK"){
		zm = window.location.origin;
		window.location.href = zm+"";
	}
		

}

function onWyloguj(e){
	e.preventDefault();
	e.stopPropagation();
	
	$.ajax({
		url: "wyloguj",
		type: "POST"
	}).done(onWylogujSucess);
};

function onWylogujSucess(resp){
	zm = window.location.origin;
	window.location.href = zm+"";
	};

function onLogowanie(e){
	e.preventDefault();
	e.stopPropagation();
	var $inputs = $("#logowanie input");
	var data={};
	$inputs.removeClass("error-validation");
	$inputs.next(".komunikat").text("");
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		if(name=="login" && $this.val()==""){
			$this.addClass("error-validation");
//			$('#loginBlad').addClass("square").text("Login jest polem wymaganym");
			$this.next('.komunikat').text("Login jest polem wymaganym!").addClass("square");
		}	
		if (name=="haslo" && $this.val()==""){
			$this.addClass("error-validation");
//			$('#hasloBlad').addClass("square").text(" Haslo jest polem wymaganym");
			$this.next('.komunikat').text("Haslo jest polem wymaganym!").addClass("square");
		}	
		data[name]=$this.val();
	});
	if ($inputs.filter(".error-validation").length)
		return
	$.ajax({
		url: "sprLogowanie",
		type: "POST",
		data: data
	}).done(onLogowanieSucess);
};
function onLogowanieSucess(resp){
	zm = window.location.origin;
	if(resp=="OK"){	
		window.location.href = zm+"";
	}	
	else{
		var $inputs = $("#logowanie input");
		var $this="";
		$inputs.each(function(){
			$this = $(this);
			$this.addClass("error-validation");
		});
		var $zm = $inputs[$inputs.length-1];
		$this.next('.komunikat').text("Zle dane logowania!").addClass("square");
	}
		
	};

function onEdycjaDaneUzytkownika(e){
	e.preventDefault();
	e.stopPropagation();
	var $inputs = $("#daneUzytkownik input");
	$inputs.next('.komunikat').text("");
	var data={};
	$inputs.removeClass("error-validation");
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		if(name == "email"){
			if($this.val()==""){
				$this.addClass("error-validation");
				$this.next(".komunikat").text("Email jest polem wymaganym!").addClass("square");
			}
			else if(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+/.test($this.val())==false){
				$this.addClass("error-validation");
				$this.next(".komunikat").text("Email jest niepoprawny!").addClass("square");
			}
		}
		if(name=="imie"){
			if($this.val()==""){
				$this.addClass("error-validation");
				$this.next(".komunikat").text("Imie jest polem wymaganym!").addClass("square");
			}
			else if(/[0-9]+/.test($this.val())){
				$this.addClass("error-validation");
				$this.next(".komunikat").text("Imie nie moze zawierac cyfr!").addClass("square");
			}
		} 
		if(name=="nazwisko"){
			if($this.val()==""){
				$this.addClass("error-validation");
				$this.next(".komunikat").text("Nazwisko jest polem wymaganym!").addClass("square");
			}
			else if(/[0-9]+/.test($this.val())){
				$this.addClass("error-validation");
				$this.next(".komunikat").text("Nazwisko nie moze zawierac cyfr!").addClass("square");
			}
		} 
		data[name]=$this.val();
			
	});
	if ($inputs.filter(".error-validation").length)
		return
	$.ajax({
		url:"zmianadaneUzytkownika",
		type:"POST",
		data: data
	}).done(onEdycjaDaneSucess);
}

function onEdycjaDaneSucess(resp){
	zm = window.location.origin;
	window.location.href = zm+"/daneUzytkownika";
};


function onDodajTowarClick(e){
	e.preventDefault();
	e.stopPropagation();
	var $inputs = $("#dodajTowar input");
	$inputs.removeClass("error-validation");
	$inputs.next(".komunikat").text("");
	var $select =$("#dodajTowar select");
	$select.removeClass("error-validation");
	$select.next(".komunikat").text("");
	var data={};
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		if (name=="nazwaTowaru" && $this.val()==""){
			$this.addClass("error-validation");
			$this.next('.komunikat').text("Nazwa towaru jest polem wymaganym!").addClass("square");
		}
		if(name=="ilosc" && $this.val()==""){
			$this.addClass("error-validation");
			$this.next('.komunikat').text("Ilosc jest polem wymaganym!").addClass("square");
		}	
		else
			data[name]=$this.val();
	});
	if ($select.val()==0){
		$select.addClass("error-validation");
		$select.next('.komunikat').text("Kategoria jest polem wymaganym!").addClass("square");
	}
	else{
		data["kategoria"]= $select.val();
	}
	if ($inputs.filter(".error-validation").length)
		return
	if ($select.filter(".error-validation").length)
		return
	
	$.ajax({
		url:"dodanieNowegoTowaru",
		type:"POST",
		data: data
	}).done(onDodajSucess);
}

function onDodajSucess(resp){
	zm = window.location.origin
	window.location.href = zm+"";
}

function onZmianaHasla(e)
{
	e.preventDefault();
	e.stopPropagation();
	var $inputs = $("#hasloUzytkownik input");
	$inputs.removeClass("error-validation");
	$inputs.next(".komunikat").text("");
	var data={};
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		if (name=="stareHaslo" && $this.val()==""){
			$this.addClass("error-validation");
			$this.next('.komunikat').text("Stare haslo jest polem wymaganym!").addClass("square");
		}			
		if (name=="noweHaslo"){
			if($this.val()==""){
				$this.addClass("error-validation");
				$this.next('.komunikat').text("Nowe haslo jest polem wymaganym!").addClass("square");
			}
			else if($this.val()==data["stareHaslo"]){
				$this.addClass("error-validation");
				$this.next('.komunikat').text("Nowe haslo musi byc inne od hasla powyzej!").addClass("square");
			}
		}		
		if (name=="powtorzHaslo"){
			if($this.val()==""){
				$this.addClass("error-validation");
				$this.next('.komunikat').text("Powtorz haslo jest polem wymaganym!").addClass("square");
			}
			else if($this.val()==data["stareHaslo"]){
				$this.addClass("error-validation");
				$this.next('.komunikat').text("Powtorz haslo musi byc rozne od starego hasla!").addClass("square");
			}
			else if($this.val()!=data["noweHaslo"]){
				$this.addClass("error-validation");
				$this.next('.komunikat').text("Powtorz haslo musi byc takie same jak nowe haslo!").addClass("square");
			}
		}
		data[name]=$this.val();
	});
	if ($inputs.filter(".error-validation").length)
		return
		console.log(data);
	$.ajax({
		url:"zmianaHasla",
		type:"POST",
		data: data
	}).done(onEdycjaSucess);
	
}

function onEdycjaSucess(resp){
	if (resp=="OK"){
		zm = window.location.origin
		window.location.href = zm+"/formUzytkownik";
	}
	else{
		var $inputs = $("#hasloUzytkownik input");
		var $this="";
		$inputs.each(function(){
			$this = $(this);
			$this.addClass("error-validation");
		});
		var $zm = $inputs[$inputs.length-1];
		$this.next('.komunikat').text("Zle wprowadzone dane!").addClass("square");
	}
		
}

$(window).on("load", init);
