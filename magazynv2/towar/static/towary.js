function init()
	{
	$("#formHasloUzytkownik").on("click",onZmianaHasla);
	
	$("#formDodajTowar").on("click",onDodajTowarClick);
	
	$("#formDaneUzytkownik").on("click",onEdycjaDaneUzytkownika);
	
	$("#formLogin").on("click",onLogowanie);
	
	$("#wyloguj").on("click",onWyloguj);
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
	window.location.href = "http://127.0.0.1:8000/";
	};

function onLogowanie(e){
	e.preventDefault();
	e.stopPropagation();
	var $inputs = $("#logowanie input");
	var data={};
	$inputs.removeClass("error-validation");
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		if(name=="login" && $this.val()=="")
			$this.addClass("error-validation");
		else if (name=="haslo" && $this.val()=="")
			$this.addClass("error-validation");
		else
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
	console.log(resp);
	if(resp=="OK")
		window.location.href = "http://127.0.0.1:8000/";
	else{
		alert(resp);
	}
		
	};

function onEdycjaDaneUzytkownika(e){
	e.preventDefault();
	e.stopPropagation();
	var $inputs = $("#daneUzytkownik input");
	var data={};
	$inputs.removeClass("error-validation");
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		if(name == "email" && /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+/.test($this.val()))
			data[name]=$this.val();
		else if (name=="email"){
			$this.addClass("error-validation");
		}
		else if(name=="imie" && /[0-9]+/.test($this.val()))
			$this.addClass("error-validation");
		else if(name=="nazwisko" && /[0-9]+/.test($this.val()))
			$this.addClass("error-validation");
		else data[name]=$this.val();
			
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
window.location.href = "http://127.0.0.1:8000/daneUzytkownika";
};


function onDodajTowarClick(e){
	e.preventDefault();
	e.stopPropagation();
	var $inputs = $("#dodajTowar input");
	$inputs.removeClass("error-validation");
	var $select =$("#dodajTowar option:selected");
	var data={};
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		if (name=="nazwaTowaru" && $this.val()=="")
			$this.addClass("error-validation");
//			$this.next(".komunikat").text("Wymagane pole!").addClass("alert alert-danger");
		else if(name=="ilosc" && $this.val()=="")
			$this.addClass("error-validation")
		else
			data[name]=$this.val();
	});
	if ($inputs.filter(".error-validation").length)
		return
	data["kategoria"]= $select.val();
	$.ajax({
		url:"dodanieNowegoTowaru",
		type:"POST",
		data: data
	}).done(onDodajSucess);
}

function onDodajSucess(resp){
	window.location.href = "http://127.0.0.1:8000/";
}

function onZmianaHasla(e)
{
	e.preventDefault();
	e.stopPropagation();
	var $inputs = $("#hasloUzytkownik input");
	$inputs.removeClass("error-validation");
	var data={};
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		if (name=="stareHaslo" && $this.val()=="")
			$this.addClass("error-validation");
		else if (name=="noweHaslo" && ($this.val()=="" || $this.val()==data["stareHaslo"]))
			$this.addClass("error-validation");
		else if (name=="powtorzHaslo" && ($this.val()=="" || $this.val()==data["stareHaslo"] || $this.val()!=data["noweHaslo"]))
			$this.addClass("error-validation");
		else
			data[name]=$this.val();
	});
	if ($inputs.filter(".error-validation").length)
		return
	$.ajax({
		url:"zmianaHasla",
		type:"POST",
		data: data
	}).done(onEdycjaSucess);
	
}

function onEdycjaSucess(resp){
	if (resp!="OK")
		alert(resp);
	else
		window.location.href = "http://127.0.0.1:8000/daneUzytkownika";
}

$(window).on("load", init);
