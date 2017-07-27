function init()
	{
	$("#formEdycja").on("click",onEdycjaClick);
	
	$("#formDodajTowar").on("click",onDodajTowarClick);
	
	$("#formDaneUzytkownik").on("click",onEdycjaDaneUzytkownika);
	}

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
			$this.addClass("error-validation")
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

function onEdycjaClick(e)
{
	e.preventDefault();
	e.stopPropagation();
	var $inputs = $("#hasloForms input");
	var data={};
	$inputs.each(function(){
		var $this = $(this);
		var name = $this.attr("name");
		data[name]=$this.val();
	});
	
	$.ajax({
		url:"daneUzytkownika",
		type:"POST",
		data: data
	}).done(onEdycjaSucess);
	
}

function onEdycjaSucess(resp){
	console.log("dziala");
}

$(window).on("load", init);
