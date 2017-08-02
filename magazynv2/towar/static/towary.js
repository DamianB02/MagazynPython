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
	$('#loginBlad').removeClass().text("");
	$('#hasloBlad').removeClass().text("");
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		if(name=="login" && $this.val()==""){
			$this.addClass("error-validation");
			$('#loginBlad').addClass("square").text("Login jest polem wymaganym");
			console.log($("#loginBlad").get())
		}	
		if (name=="haslo" && $this.val()==""){
			$this.addClass("error-validation");
			$('#hasloBlad').append('<div class="square"> Haslo jest polem wymaganym</div>');
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
	console.log(resp);
	if(resp=="OK"){
		zm = window.location.origin;
		window.location.href = zm+"";
	}
		
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
	zm = window.location.origin;
	window.location.href = zm+"/daneUzytkownika";
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
	zm = window.location.origin
	window.location.href = zm+"";
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
	else{
		zm = window.location.origin;
		window.location.href = zm+"/daneUzytkownika";
	}
		
}

$(window).on("load", init);
