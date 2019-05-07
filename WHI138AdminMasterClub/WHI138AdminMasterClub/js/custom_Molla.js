/*===============================================
	FUNÇÕES GLOBAIS
	funções a serem utilizadas para validar 
	formulários, campos, checar cpf, checar email,
	retornar msg ao usuário, etc.
	===============================================*/
/*------
Capturar parametros passados via url querystring
*/
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*------
Centralizar verticalmente os elementos entre eles,
utilizando um deles como base;
*/
function alinharVert(elem,pos){
	var childs = elem.find(" > *"),
	heightBase = 0,
	gap;
	offsetY = $(elem).data("offsetY") != undefined ? parseInt($(elem).data("offsetY")) : 0;
	for (var i = childs.length - 1; i >= 0; i--) {
		if ($(childs[i]).height() > heightBase){
			heightBase = $(childs[i]).height();
		}
	};
	for (var i = childs.length - 1; i >= 0; i--) {
		gap = ((heightBase - $(childs[i]).height()))
		if(gap!=0){
			switch(pos) {
				case "top":
				$(childs[i]).css('margin-bottom', (gap)+offsetY)
				break;
				case "center":
				$(childs[i]).css('margin-top', (gap/2)+offsetY)
				break;
				case "bottom":
				$(childs[i]).css('margin-top', (gap)+offsetY)
				break;
			};
		}
//console.log("heightBase",heightBase,"gap",gap,"offsetY",offsetY)
	}
}

/*------
 Capturar a altura de dado elemento
*/
function getHeight(elem){
	var elemH = $(elem).height();
	return elemH;
}

//FUNÇÃO PARA RETORNAR MENSAGEM AO USUÁRIO A SOLICITAÇÃO SUBMETIDA
/*
Parametros:
- tipo 		= string ('alert'[bloco com fundo da cor do status] ou 'help-block'[frase embaixo do campo])
- status 	= string (success, error, warning)
- elemento	= objeto (elemento a receber o aviso)
- msg 		= string (texto que aparecerá para o user) 
*/
function retornaMsg(tipo, status, elemento, msg){
	//console.log('retornaMsg');
	//remove todas as mensagens da pagina antes de exibir uma nova
	$('.retornaMsg-wrapper').remove();
	$('.form-group').removeClass('form-group').addClass('form-group');
	var $this = $(elemento);
	var msgWrap = '<span id="" class="retornaMsg-wrapper dblock '+tipo+' '+tipo+'-'+status+'">'+msg+'</span>';
	
	if(status == "success"){
		return;
	}
	// if(tipo == "alert"){
	// 	//console.log('alert');
	// 	//lastFormField = pega o último campo do form para exibir a mensagem no final do formulario
	// 	var $lastFormField = $this.find(':input').not(':submit, :button').last();
	// 	$lastFormField.parents(".row").addClass('parentsRow').first().addClass('parentsRow-First').after(msgWrap).find("#retornaMsg-wrapper").addClass('dblock');
	// 	//console.log($lastFormField.length);
	// }
	else{
		//console.log('help-block');
		for (var i=0; i < $this.length; i++) {
			//console.log($this[i])
			$this.closest(".form-group").addClass('has-'+status).append(msgWrap);
		};
		$("html, body").animate({
			scrollTop: $this.offset().top - 110
		}, {
				duration: 500,
				easing: "swing"
		});
		$this.focus();
	}
}

/*------
Validação de formulário
*/

//Limpar string
function remove(str, sub) {
		i = str.indexOf(sub);
		r = "";
		if (i == -1) return str;{
			r += str.substring(0,i) + remove(str.substring(i + sub.length), sub);
		}
		return r;
}
//Validar email
function validarEmail(email){
	var reEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/gi);
	console.log(reEmail,'-',email)
	if(!reEmail.test(email) ){
		if(email==''){
			return true
		}else{
			return false;
		}
	}
	return true;
}

//Validar Celular
function validarNumero(numerico){
	numerico = numerico.replace(/\D/g,'');
	if(numerico == ''){
		return false
	}
	else{
		return true;
	}
}
function validarCelular(str){
	var retorno = {};
	str = str.replace(/\D/g,'');
	var arrNumberNotAllowed = ["99999999","999999999","88888888","888888888","77777777","777777777","55555555","555555555","44444444","444444444","33333333","333333333","22222222","222222222","11111111","111111111","00000000","000000000"];
	if(str.length < 10){
		retorno.sucesso=false;
		retorno.mesg='Número de celular inválido';
		return retorno;
	}
	else{
		var digito = str.substring(0,2);
		console.log(digito)
		var regeZ = new RegExp(/(10)|([1-9][1-9])/g); 

		if(!regeZ.test(digito)){
			//return false
			retorno.sucesso=false;
			retorno.mesg='Código de área inválido';
			return retorno;
		}
	};
	for (var i = arrNumberNotAllowed.length - 1; i >= 0; i--) {
		if(remove(str,"-").search(arrNumberNotAllowed[i]) != -1){
			retorno.sucesso=false;
			retorno.mesg='Número inválido';
			return retorno;
		}

	};
	retorno.sucesso=true;
	retorno.mesg='';
	return retorno;
	
}
//Validar CPF
function validarCNPJ(cnpj){
	var filtro = /(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})/g;
	if(!filtro.test(cnpj)){
		return false;
	}
	cnpj = remove(cnpj, ".");
	cnpj = remove(cnpj, "-");
	cnpj = remove(cnpj, "/");
	
	// Elimina CNPJs invalidos conhecidos
    if (//cnpj == "00000000000000" ||  /*removi este cpf para ser usado como teste pela itamaraty*/
        //cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
	{
        return false;
	}
	// Valida DVs
    var tamanho = cnpj.length - 2;
	var	numeros = cnpj.substring(0,tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
};
//Validar CPF

function validarCPF(cpf){
	var filtro = /^\d{3}.\d{3}.\d{3}-\d{2}$/i;
	if(!filtro.test(cpf)){
		//window.alert("CPF inválido. Tente novamente.");
		return false;
	}
	cpf = remove(cpf, ".");
	cpf = remove(cpf, "-");
	/*if(
		cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
		cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
		cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
		cpf == "88888888888" || cpf == "99999999999"
		){
		//window.alert("CPF inválido. Tente novamente.");
		return false;
	}*/
	soma = 0;
	for(i = 0; i < 9; i++){
		soma += parseInt(cpf.charAt(i)) * (10 - i);
	}	
	resto = 11 - (soma % 11);
	if(resto == 10 || resto == 11){
		resto = 0;
	}
	if(resto != parseInt(cpf.charAt(9))){
		//window.alert("CPF inválido. Tente novamente.");
		return false;
	}
	soma = 0;
	for(i = 0; i < 10; i ++){
		soma += parseInt(cpf.charAt(i)) * (11 - i);
	}
	resto = 11 - (soma % 11);
	if(resto == 10 || resto == 11){
		resto = 0;
	}	
	if(resto != parseInt(cpf.charAt(10))){
		//window.alert("CPF inválido. Tente novamente.");
		return false;
	}
	return true;
};
//Validar data válida
function validarData(data){
    var expReg = /(0?[1-9]|[12]\d|3[01])[\/](0?[1-9]|1[0-2])[\/](19|20)\d{2}/g,
    	vdt = new Date(),
    	vdia = vdt.getDay(),
    	vmes = vdt.getMonth(),
    	vano = vdt.getFullYear(),

    	dia = parseFloat(data.substring(0, 2)),
    	diaString = data.substring(0, 2),
    	mes = parseFloat(data.substring(3, 5)),
    	mesString = data.substring(3, 5),
    	ano = parseFloat(data.substring(6, 10)),
    	anoString = data.substring(6, 10),
    	dataInput = new Date(ano,mes-1,dia),
    	dataMinima = new Date(00,0,1),
    	retorno = {},
    	completaData=data.replace(expReg,'$&');
		console.log('datacompleta:',completaData);
    if (data.match(expReg) == 'null') {
    	console.log('erro data')
        retorno.msg = 'Data inválida!';
        retorno.valid = false;
        return retorno;
        
    }
    else {
    	console.log('erro data 2');
    	if ((mesString == 4 && diaString > 30) || (mesString == 6 && diaString > 30) || (mesString == 9 && diaString > 30) || (mesString == 11 && diaString > 30)) {
            retorno.msg = "Data incorreta! O mês especificado contém no máximo 30 dias!";
            retorno.valid = false;
            return retorno;
        }
        else if (anoString % 4 != 0 && mesString == 2 && diaString > 28) {
            retorno.msg = "Data incorreta! O mês especificado contém no máximo 28 dias!";
            retorno.valid = false;
            return retorno;
        }
        else if (anoString % 4 == 0 && mesString == 2 && diaString > 29) {
            retorno.msg = "Data incorreta! O mês especificado contém no máximo 29 dias!";
            retorno.valid = false;
            return retorno;
        }
        else if (dataInput > vdt) {
            retorno.msg = "Data incorreta! A data informada é maior que a atual!";
            retorno.valid = false;
            return retorno;
        }
        else if(validarIdade(anoString, mesString, diaString) < 18)
        {
        	//console.log(validarIdade(anoString, mes, dia));
        	retorno.msg = "O dia das Mães Maruchan é para maiores de 18 anos!";
            retorno.valid = false;
            return retorno;
        }
        else if( anoString == '' || diaString == '' || mesString == '' || anoString<=999){
        	//console.log(validarIdade(ano, mes, dia));
        	retorno.msg = "Digite DD/MM/AAAA";
            retorno.valid = false;
            return retorno;
        }
        else if(  mesString > 12 ){
        	//console.log(validarIdade(ano, mes, dia));
        	retorno.msg = "Digite um mês válido";
            retorno.valid = false;
            return retorno;
        }

        else if(dataInput < dataMinima){
        	retorno.msg = "A data digitada é muito antiga, por favor confira se está no formato padrão.";
            retorno.valid = false;
            return retorno	
        }
        
    }
    console.log('sucesso')
    retorno.msg = 'sucesso';
    retorno.valid = true;
    return retorno;
}
//Retornar idade atraves da data inputada
function validarIdade(ano_aniversario, mes_aniversario, dia_aniversario) {
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),

        ano_aniversario = +ano_aniversario,
        mes_aniversario = +mes_aniversario,
        dia_aniversario = +dia_aniversario,

        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
}
//limpa campo CEP
function limpa_formulário_cep() {
	// Limpa valores do formulário de cep.
	$("#cadastro_ENDERECO").val("");
	$("#cadastro_CIDADE").val("");
	$("#cadastro_UF").val("");
	$("#cadastro_BAIRRO").val("");
	// Limpa valores do formulário de cep.
	$("#Conteudo_cadastro_ENDERECO").val("");
	$("#Conteudo_cadastro_CIDADE").val("");
	$("#Conteudo_cadastro_UF").val("");
	$("#Conteudo_cadastro_BAIRRO").val("");
}
// Validar Formulario 
function validarImg(campos){
    campos = campos.find('[data-img]');
	var imgValor = campos.val();
	var regex = /[\S\w\s]+(\.\w+)/g;
	var valorRegex = imgValor.replace(regex,'$1');
	if(imgValor == ""){
		
		retornaMsg("help-block","error",campos,"Faça o upload de sua imagem");
		return false
	}
	else if(valorRegex != ".png" && valorRegex != ".jpg" && valorRegex != ".jpeg"){
		//$('a.fileupload-exists').trigger('click');
		retornaMsg("help-block","error",campos,"Faça o upload somente de arquivos de imagem");
		return false
	}
	else{
		retornaMsg("help-block","success",campos,"");
	}
	return true;
}

function validarImgPerfil(campos){
    campos = campos.find('[data-imgPerfil]');
	var imgValor = campos.val();
	var regex = /\S+(\.\w+)/g;
	var valorRegex = imgValor.replace(regex,'$1');
    if(valorRegex != ".png" && valorRegex != ".jpg" && valorRegex != ".jpeg" && valorRegex != ""){
		//$('a.fileupload-exists').trigger('click');
		retornaMsg("help-block","error",campos,"Faça o upload somente de arquivos de imagem");
		return false
	}
	else{
		retornaMsg("help-block","success",campos,"");
	}
	return true;
}

function validaForm(form){
	var campos = form.find("[data-obrigatorio]").not(":hidden");
	//console.log(campos)
	console.log('ss',$(campos[i]).attr("data-email"));
	for (var i = 0; i <= campos.length - 1; i++) {
		
		if(!campos[i].value){
			retornaMsg("alert","danger",campos[i],"Campo obrigatório.");
			return false;
		}
		
		else if($(campos[i]).attr("data-cpf")){
			if(!validarCPF(campos[i].value)){
				retornaMsg("alert","danger",campos[i],"CPF inválido.");
				return false;
			};
		}
		else if($(campos[i]).attr("data-cnpj")){
			if(!validarCNPJ(campos[i].value)){
				retornaMsg("alert","danger",campos[i],"O CNPJ informado é inválido, por favor, insira um correto para se cadastrar.");
				return false;
			};
		}
		else if($(campos[i]).data("email")){
			if(!validarEmail(campos[i].value)){
				retornaMsg("alert","danger",campos[i],"E-mail inválido.");
				return false;
			};
		}
		else if($(campos[i]).data("nascimento")){
			var retornoValidacao = validarData(campos[i].value);
			console.log(retornoValidacao);
		
			if(!retornoValidacao.valid){
				retornaMsg("help-block","error",campos[i],retornoValidacao.msg);
				return false;
			};
		}
		else if($(campos[i]).attr("data-select")){
			if($('[data-select]').val()<=0){
				console.log($('[data-select]').val()>=0)
				retornaMsg("alert","danger",campos[i],"Selecione um campo.");
				return false;
			}
		}
		else if($(campos[i]).attr("data-radio")){
			console.log('ss',$(campos[i]).attr("data-radio"));

			if($('input[data-radio]:checked').length < 1){
				retornaMsg("help-block","error",campos[i],"Escolha uma Alternativa.");
				return false;
			};
		}

		else if($(campos[i]).data("senha")){

			var senhaPrimeira = campos[i].value;
			var confirmaSenha = $('input[data-senhaConfirma]').val();
			if(senhaPrimeira!=confirmaSenha){
				retornaMsg("alert","danger",campos[i],"Senhas diferentes.");
				return false;
			};


		}
		else if($(campos[i]).data("telefone")){
			console.log('ss',$(campos[i]).attr("data-telefone"));
			var retornoValidacao = validarCelular(campos[i].value);
			console.log(retornoValidacao);
			if(!retornoValidacao.sucesso){		
				retornaMsg("alert","danger",campos[i], retornoValidacao.mesg);
				return false;
			};
		}
	}
	return true;
}


/*------
Mascaras de formulário
*/
function maskCPF(valorDoInput){
	if(!detectar_mobile()){
	valorDoInput = valorDoInput.replace( /\D/g , ""); //Remove tudo o que não é dígito
    valorDoInput = valorDoInput.replace( /^(\d{3})(\d)/g , "$1.$2"); //Coloca ponto entre o segundo e o terceiro dígitos
    valorDoInput = valorDoInput.replace( /^(\d{3})\.(\d{3})(\d)/g , "$1.$2.$3"); //Coloca ponto entre o quinto e o sexto dígitos
    valorDoInput = valorDoInput.replace( /\.(\d{3})(\d)/g , ".$1-$2"); //Coloca uma barra entre o oitavo e o nono dígitos
   /* valorDoInput = valorDoInput.replace( /(\d{4})(\d)/ , "$1-$2"); //Coloca um hífen depois do bloco de quatro dígitos*/
    return valorDoInput;

    }
     else{
     	valorDoInput = valorDoInput.replace( /\D/g , "");
    	valorDoInput = valorDoInput.replace( /^(\d{3})(\d{3})(\d{3})(\d{2})$/g , "$1.$2.$3-$4");
    	return valorDoInput;
    }

}
function maskCNPJ(valorDoInput){
	
	valorDoInput = valorDoInput.replace( /\D/g , ""); //Remove tudo o que não é dígito
    valorDoInput = valorDoInput.replace( /^(\d{2})(\d)/ , "$1.$2"); //Coloca ponto entre o segundo e o terceiro dígitos
	valorDoInput = valorDoInput.replace( /^(\d{2})\.(\d{3})(\d)/ , "$1.$2.$3");
	valorDoInput = valorDoInput.replace( /^(\d{2})\.(\d{3})\.(\d{3})(\d)/ , "$1.$2.$3/$4"); //Coloca ponto entre o quinto e o sexto dígitos
	valorDoInput = valorDoInput.replace( /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d+)/ , "$1.$2.$3/$4-$5"); //Coloca ponto entre o quinto e o sexto dígitos
    // valorDoInput = valorDoInput.replace( /(\d{4})(\d)/ , "$1-$2"); //Coloca um hífen depois do bloco de quatro dígitos
    return valorDoInput;
    

}
function maskCEP(valorDoInput){
	valorDoInput = valorDoInput.replace( /\D/g , "");
	valorDoInput = valorDoInput.replace(/^(\d{5})(\d{3})$/,'$1-$2');

	return valorDoInput;
}
function maskTelefone(valorDoInput){
	if(!detectar_mobile()){
	valorDoInput = valorDoInput.replace( /\D/g , "");
	valorDoInput = valorDoInput.replace(/^(\d{2})/,'($1)');
	valorDoInput = valorDoInput.replace(/(\d{4,5})(\d{4})$/,'$1-$2');
	return valorDoInput;
	}
	else{
		valorDoInput = valorDoInput.replace( /\D/g , "");
		valorDoInput = valorDoInput.replace(/(\d{2})(\d{4,5})(\d{4})$/,'($1)$2-$3');
		return valorDoInput;
	}
}
function maskNumerico(valorDoInput){
	valorDoInput = valorDoInput.replace( /\D/g , "");
	return valorDoInput;
}
function maskData(valorDoInput){
	if(!detectar_mobile()){
		valorDoInput = valorDoInput.replace( /\D/g , "");
		valorDoInput = valorDoInput.replace(/^(\d{2})/g,'$1/');
		valorDoInput = valorDoInput.replace(/^(\d{2})[/](\d{2})/g,'$1/$2/');
		valorDoInput = valorDoInput.replace(/(\d{2})[/](\d{2})[/](\d{4})/g,'$1/$2/$3');
		return valorDoInput;
	}
	 else{
	 	valorDoInput = valorDoInput.replace( /\D/g , "");
    	valorDoInput = valorDoInput.replace(/(\d{2})(\d{2})(\d{4})/g,'$1/$2/$3');
    	return valorDoInput;
    }
}
function processando(el){
	var icon = ' <i class="fa fa-spin fa-spinner"></i>'
	el.addClass("disabled").find("span").append(icon);
}


//Click to Expand
function expandConteudo(el,target){
	target.toggle();
	window.theme.Nav.scrollToTarget(el,20)
}

function tableHover(el){
	var $this = el;
	var index = $this.index();
	// console.log(index)
	$this.parents("tbody").find("td:eq("+index+")").addClass("hover-color-secondary")
}
/*--------------------------------------------------------------------------
	\\        // ||   ||==== \\              //                 ====    //===\\    ||\     || =========
	 \\      //  ||   ||      \\            //       ||       //       //     \\   ||\\    ||    || 
	  \\    //   ||   ||       \\          //      ==||==     ||      //       \\  || \\   ||    || 
	   \\  //    ||   ||====    \\   /\   //         ||       ||      \\       //  ||  \\  ||    || 
	    \\//     ||   ||         \\//  \\//                   ||       \\     //   ||   \\ ||    ||   _
	     \/      ||   ||=====     \/    \/                     \\===    \\===//    ||    \\||    ||  |_|
---------------------------------------------------------------------------*/
$(function () {
	/* 
		Mouse over para tabelas
	*/
	$(".table-custom.table-hover").on("mouseenter","td",function(){
		tableHover($(this))
	})
	$("[data-cep]").blur(function () {
		//Nova variável "cep" somente com dígitos.
		var cep = $('[data-cep]').val().replace(/\D/g, '');
		//Verifica se campo cep possui valor informado.
		if (cep != "") {
			//Expressão regular para validar o CEP.
			var validacep = /^[0-9]{8}$/;
			//Valida o formato do CEP.
			//console.log(cep);
			if (validacep.test(cep)) {
				//Preenche os campos com "..." enquanto consulta webservice.
				/*$('#btn_cadastroCEP').parent().after('<div class="col-xs-4 col-md-4 pl-xs"><span class="text-info"><i class="fa fa-spin fa-spinner"></i></span></div>')*/
				$("#logradouro").val("...")
				$("#bairro").val("...")
				// $("#cadastro_CIDADE").val("...")
				// $("#cadastro_UF").val("...")
				//Consulta o webservice viacep.com.br/
				$.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
					// console.log(dados);
					if (!("erro" in dados)) {
						//Atualiza os campos com os valores da consulta.
						/*$('#btn_cadastroCEP').parents(".row").first().find('.col-xs-4').remove();*/
						retornaMsg('','success',$("[data-cep]"),'');
						$("#logradouro").val(dados.logradouro);
						$("#bairro").val(dados.bairro);
						var cidade=dados.localidade;
						console.log('cidade ajax:' + cidade);
						$('#estado').val(cidade);
						
                        
						/*$("#cadastro_CIDADE").val(dados.localidade);*/
						var estado = dados.uf;	
                        console.log('estado ajax:' + estado);				
						// $("#cadastro_UF option:contains(" + estado + ")").attr('selected', 'selected');
						$("#uf").val(estado);		
                        $("#estadoc option").each(function(){
                            if($(this).text().toLowerCase() == estado.toLowerCase()){
                             console.log('estado if: ' + $(this).text());
								$(this).removeAttr('selected'); 
								 $(this).attr('selected', 'selected');
								 FUN_ListaCidade($('#estadoc option:selected').val(),cidade.toLowerCase());
                            }
						});
						
						$("#cidadec option").each(function(){
							
                            if($(this).text().toLowerCase() == cidade.toLowerCase()){
                            // console.log('cidade if: ' + $(this).text());
							// 	$(this).removeAttr('selected'); 
							// 	$(this).attr('selected', 'selected');
                            }
                        });				
						/*var estado = $("[value=" + dados.uf + "]").attr('title');
						$("#cadastro_UF").val(dados.uf).attr('title', estado);*/
						/*$('#btn_cadastroCEP').parent().next().remove();*/
						$("#numero").focus();
						
					} //end if.
					else {
						//CEP pesquisado não foi encontrado.
						/*$('#btn_cadastroCEP').parents(".row").first().find('.col-xs-4').remove();*/
						limpa_formulário_cep();
						/*$('#btn_cadastroCEP').parent().after('<div class="col-xs-4 col-md-4 pl-xs"><span class="text-danger">**CEP não encontrado**</span></div>');*/
						retornaMsg("alert","danger",$("[data-cep]"), 'CEP não encontrado');
					}
				});
			} //end if.
			else {
				//cep é inválido.
				/*$('#btn_cadastroCEP').parents(".row").first().find('.col-xs-4').remove();*/
				limpa_formulário_cep();
				/*$('#btn_cadastroCEP').parent().after('<div class="col-xs-4 col-md-4 pl-xs"><span class="text-danger">**Formato de CEP inválido**</span></div>');*/
				retornaMsg("alert","danger", $("[data-cep]"), 'Formato de CEP inválido.');
			}
		} //end if.
		else {
			//cep sem valor, limpa formulário.
			limpa_formulário_cep();
			$("#numero").val("");
		}
	});
	
	if($("[data-height]")[0]){
		$("[data-height]").each(function(){
			var $this = $(this);
			var $target = $this.data("height") || window;
			$this.css("height",getHeight($target))
		})
	}

	/*
		Escutador para expandir o conteudo
	*/
	if($("[data-click-expand]")[0]){
		$("[data-click-expand]").each(function(){
			var target = $(this).data("clickExpand");
			$(target).hide().removeClass('hidden')
			$(this).on('click',function(){
				expandConteudo($(this),$(target));	
			})
		})
		
	}
});
$(window).on("load",function(){
	$('.valignCenter').each(function(i,elem){
		var $this = $(this);
		alinharVert($this,"center");
	});
	$('.valignBottom').each(function(i,elem){
		var $this = $(this);
		alinharVert($this,"bottom");
	});	
	$('.valignTop').each(function(i,elem){
		var $this = $(this);
		alinharVert($this,"top");
	});	

});

/*
	LOGIN
*/

function detectar_mobile() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
$(function(){
	$("[data-cep]").each(function(){
		var $this = $(this);
		$this.on("keyup",function(){
			$this.val(maskCEP($this.val()))
		})
	})
	$("[data-cpf]").each(function(){
		var $this = $(this);
		$this.on('keyup',function(){
			console.log($this.val())
			var valor = $this.val(); 
			if($this.val().length > 14){ 
				$this.val( $this.val().substr(0, 15 - 1));
				
				//$this.val(maskCPF(modificada));
			}
			else{
				$this.val(maskCPF($this.val()));
				
				
			}
		})
		
		/*$this[0].addEventListener("keyup", function(){
			console.log($this.val())
			if($this.val().length > 14){ 
				
				var valorS = $this.val().slice(0, $this.val().length - 1);
				$($this).val('');
				$($this).val(valorS);
				//$this.val(maskCPF(modificada));
			}
			else{
				$this.val(maskCPF($this.val()))
				
			}
		})*/
	})
	$("[data-cnpj]").each(function(){
		var $this = $(this);
		$this.on('keyup',function(){
			console.log($this.val())
			var valor = $this.val(); 
			if($this.val().length > 18){ 
				$this.val( $this.val().substr(0, 19 - 1));
				
				//$this.val(maskCPF(modificada));
			}
			else{
				$this.val(maskCNPJ($this.val()));
				
				
			}
		})
	})
	$("[data-numerico]").each(function(){
		var $this = $(this);
		$this.on("keyup",function(){
			console.log($this.val())
			$this.val(maskNumerico($this.val()))
		})
	})
	$("[data-nascimento]").each(function(){
		var $this = $(this);
		$this.on("keyup", function(){ 
			console.log($this.val())
			if($this.val().length > 10){ 
				$this.val( $this.val().substr(0, 11 - 1));
				
				//$this.val(maskCPF(modificada));
			}
			else{
				$this.val(maskData($this.val()));
				
				
			}
			
		})
	})

	$("[data-telefone]").each(function(){
		var $this = $(this);
		$this.on("keyup",function(){
			console.log($this.val())
			if($this.val().length > 14){ 
				$this.val( $this.val().substr(0, 15 - 1));
				
				//$this.val(maskCPF(modificada));
			}
			else{
				$this.val(maskTelefone($this.val()))
				
				
			}
			
		})
	})
	$("#btnEsqueciSenha").on("click",function(){
		var $boxLogin = $("#boxLogin");
		var $boxEsqueceuSenha = $("#boxEsqueceuSenha");
		var boxLoginH = $boxLogin.height();
		//$boxEsqueceuSenha.height(boxLoginH)
		if(!$boxLogin.is(":hidden")){
			$boxLogin.fadeOut(300,function(){
				$boxEsqueceuSenha.fadeIn();
			})
		}

	})
	$("#processLogin").on("click",function(){
		$formLogin = $("#formLogin");
		//console.log(validaForm($formLogin))
		if(validaForm($formLogin))
			$formLogin.submit();
	})
	$("#processRecuperSenha").on("click",function(){
		var $this = $(this)
		var $cnpjRecuperaSenha = $("#cnpjRecuperaSenha");
		if (!$cnpjRecuperaSenha.val()) {
			retornaMsg("help-block","error",$cnpjRecuperaSenha,"Digite o CNPJ de Distribuidor");
			return false
		}else
		if (!validarCNPJ($cnpjRecuperaSenha.val())) {
			retornaMsg("help-block","error",$cnpjRecuperaSenha,"CNPJ inválido.");
			return false
		}

		/*AJAX PARA IR NO SERVIDOR VERIFICAR O CNPJ
		  ENVIAR EMAIL COM O LINK PARA REDEFINIR A SENHA
		  PRECISA RETORNAR O EMAIL DO DISTRIBUIDOR 	PARA EXIBIR NA MENSAGEM AO USUARIO
		*/
		var cnpj = $cnpjRecuperaSenha.val();
		$.ajax({
		    type: 'POST',
		    url: window.location,//Metodo para ir no banco e fazer os procedimentos
		    contentType: 'application/json;charset=utf-8',
		    data:'"cnpj":"' + cnpj + '"',
		    dataType: 'json',
		    beforeSend: function(){
		    	console.log
		    	processando($this)
		    },           
		    success: function (data) {
		        var json = jQuery.parseJSON(data.d);
		        if (json.PRP_Status) {
		        	var msg = "<h4>Sucesso!</h4>Enviamos um email para: <strong>"+json.PRP_Email+"</strong>. Siga as instruções para redefinir sua senha.";
	    			var avisoAmigavel = "Caso este endereço de email não esteja correto ou você esteja com dificuldades para acessar o programa, por favor ligue para (11)9999-9999."
	    			$("#retornaMsg-wrapper")
	    				.html("<div class='alert alert-success mb-xs'>"+msg+"</div>")
	    				.append("<small>"+avisoAmigavel+"</small>")
	    				.addClass("mt-xlg");

	    			$("#boxEsqueceuSenha").hide()
	    			$("#boxRetornoRecuperaSenha").addClass("pt-xl pb-xl").fadeIn();
		        }
		        else {
		            console.log('erro gravação inicio da prova!');
		        }
		    },
		    error: function () {}
		}).done(function () {})
	})
});