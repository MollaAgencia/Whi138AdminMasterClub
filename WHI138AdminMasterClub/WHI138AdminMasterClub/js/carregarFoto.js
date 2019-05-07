		//valida o forme. validarform() e  está em custom.JS
	$('#btn_uploadImg').click(function (e) {
		e.preventDefault();
		if(!validarImg($('#form1'))){
			return false
		}
		
		//se o resultado do validador for true, ele faz o submit.
		if (validaForm($('#form1')) == true) {
			$('#form1').submit();
		}
	});
	//muda o icone quando não tem arquivo no upload
	function filePreview(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('.uneditable-input + img').remove();
				$('.uneditable-input').after('<img src="'+e.target.result+'" width="450" height="300"/>');
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	$('input[type=file]').change(function(){

		var valor = $(this).val();

		if(valor != ""){
			$('.uneditable-input').addClass('valign-center');
			$('.fileupload-not-exists').addClass('hidden');
			var image_holder = $("#image-holder");
			image_holder.empty();	
			console.log(image_holder.empty());		
			var reader = new FileReader();
			reader.onload = function (e) {
				$("<img />", {
					"src": e.target.result,
					"class": "thumb-image img-responsive marginauto max-width-Upload"
				}).appendTo(image_holder);
			}
			image_holder.show();
			reader.readAsDataURL($(this)[0].files[0]);		

		}
		else{
			$("#image-holder").empty();
			$('.uneditable-input').removeClass('valign-center');
			$('.fileupload-not-exists').removeClass('hidden');
			$('.fileupload-preview').text('Clique em "upload" para salvar sua imagem');
		}
	//assim que ele faz o change, esta chamada valida o campo. validarIMG() está em custom.JS
	validarImg($('#form1'));

});
