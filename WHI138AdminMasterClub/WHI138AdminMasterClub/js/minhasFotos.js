$(function () {
	/*	var $grid = $('.image-gallery').isotope({
			itemSelector: '.isotope-item'
		});*/
	    //console.log($grid)


// store filter for each group('select[data-filter-group]')
var filters = {};

$('select[data-filter-group]').change('.filterMedia option[value]', function() {
	var $this = $(this).find('option:selected');
  //console.log('Primeiro ',$this);
  // get group key
  var $buttonGroup = $this.parents('select.form-control');
  //console.log('grupo', $buttonGroup);
  var filterGroup = $buttonGroup.attr('data-filter-group');
  
  // set filter for group
  filters[ filterGroup ] = $this.attr('data-option-value');
  //console.log('filter', filters[ filterGroup ]);
  // combine filters
  var filterValue = concatValues( filters );
  // set filter for Isotope
  //$grid.isotope({ filter: filterValue });
});

/*// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
	var $buttonGroup = $( buttonGroup );
	$buttonGroup.on( 'click', 'button', function() {
		$buttonGroup.find('.is-checked').removeClass('is-checked');
		$( this ).addClass('is-checked');
	});
});*/

// flatten object by concatting values
function concatValues( obj ) {
	var value = '';
	for ( var prop in obj ) {
		value += obj[ prop ];
	}
	return value;
}


//$grid.isotope();
});
/*$(window).load(function(){
	//$('#filterStatus').trigger('change');
	$(".kpi").each(function(){
	    var $this = $(this);
	    var $exposicao = $this.parents(".row").find(".exposicao");
	    var $msg = $exposicao.next()
	    $this.on("change",function(){
	        var criterioSelecionado = $this.val()
	        //console.log(criterioSelecionado)
	        if(criterioSelecionado == 1){
	            $exposicao.hide();
	            $msg.removeClass("hide")
	        }else{
	            $exposicao.show();
	            $msg.addClass("hide")
	        }
	    })
	})
});
*/
//THG - DETALHES DA FOTO lightbox-portfolio
(function( $ ) {

	$.imagePreview = function( element ) {
		this.$element = $( element );
		this.init();
		//console.log('isto',this);
	};
	
	$.imagePreview.prototype = {
		init: function() {
			this.$triggers = this.$element.find( ".image-link" );
			//this.$closeLinks = $( ".image-details-close" );
			this.open();
			this.change();
		},
		
		_getContent: function( element ) {
			//console.log('iste', element)
			var $parent = element.closest("li"),                
                coordenador = $parent.data("nomecoordenador"),
			nomeloja = $parent.data( "nomeloja" ),
			bairro = $parent.data( "bairro" ),
			exposicao = $parent.data( "exposicao" ),
			status = $parent.data( "status" ),
			senha = $parent.data( "senha" ),
            motivo = $parent.data("motivo"),
            dtupload = $parent.data("dtupload"),
/*				id = $parent.data( "id" ),
				supervisor = $parent.data( "supervisor" ),
				promotor = $parent.data( "promotor" ),
				pdv = $parent.data( "pdv"),
				produto = $parent.data( "produto"),
				ava = $parent.data( "ava"),
				dia = $parent.data( "dia"),
				exposicao = $parent.data( "exposicao"),
				share = $parent.data( "share"),
				divisao = $parent.data( "divisao"),
				formato = $parent.data( "formato"),
				canal = $prent.data( "canal"),
				status = $parent.data( "status"),
				motivo = $parent.data( "motivo"),
				motivo_obs = $parent.data( "motivo-obs"),
				contestacao = $parent.data("contestacao"),
				exclui = $parent.data("exclui"),
				contesta = $parent.data("contesta"),*/
				/*contestacao = $parent.data("contestacao"),*/
                /*meta = $parent.data("meta") ? $parent.data("meta") : null,
                real = $parent.data("real") ? $parent.data("real") : null,*/
                urlImg = $parent.find("img").attr("src")
                return {
                    nomeloja: nomeloja,
                    coordenador: coordenador,
                	bairro:bairro,
                	exposicao:exposicao,
                	status:status,
                	senha:senha,
                	urlImg:urlImg,
                    motivo: motivo,
                    dtupload: dtupload
/*                    id:id,
					dia:dia,
					promotor:promotor,
					senha:senha,
					pdv:pdv,
					criterio:criterio,
					exposicao:exposicao,
					categoria1:categoria1,
					produto1:produto1,
					categoria2:categoria2,
					produto2:produto2,
					categoria3:categoria3,
					produto3:produto3,
					status:status,
					motivo:motivo,
					motivo_obs:motivo_obs,					
                    meta: meta,
                    real:real*/
                }
            },
            change:function(){
            	$("#scrollGaleria select.form-control").on("change",function(){
            		$(".image-details-close").trigger("click")				
            	})
            },
            open: function() {
			//$(".image-details-close").trigger("click")
			var self = this;
			self.$triggers.on( "click", function( e ) {
				e.preventDefault();
				var $a = $( this ),
				content = self._getContent( $a ),
				$li = $a.parents( "li" ),
				status = $li.attr("class"),
				$details = self.$element.next( ".image-details" ),
				$detailsNomeloja   = $details.find("#descNomeloja"),
				$detailsBairro     = $details.find("#descBairro"),
				$detailsExposicao  = $details.find("#descExposicao"),
				$detailsStatus  = $details.find("#descStatus"),
				$detailsSenha	   = $details.find("#descSenha"),
                $detailsMotivo 		= $details.find( "#descMotivo"),
                $detailsDtupload = $details.find("#descDtupload"),
                $detailsCoordenador = $details.find("#descCoordenador"),
				/*$contentImage 		= $details.find(".image-details-content"),
				$detailsID 			= $details.find("#descID"),
				$detailsSenha 		= $details.find( "#descSenha"),
				$detailsSupervisor 	= $details.find( "#descSupervisor"),
				$detailsPromotor 	= $details.find( "#descPromotor"),
				$detailsPdv 		= $details.find( "#descPdv"),
				$detailsProduto 	= $details.find( "#descProduto"),
				$detailsAva    		= $details.find("#descAva"),
				$detailsDia        	= $details.find("#descDia"),
				$detailsExposicao   = $details.find("#descExposicao"),
				$detailsShare 		= $details.find( "#descShare"),
				$detailsDivisao 	= $details.find( "#descDivisao"),
				$detailsFormato 	= $details.find( "#descFormato"),
				$detailsCanal 		= $details.find( "#descCanal"),
				$detailsStatus 		= $details.find( "#descStatus"),
				$detailsMotivo 		= $details.find( "#descMotivo"),
				$detailsMotivo_obs 	= $details.find( "#descMotivo-obs"),
				$detailsContestacao = $details.find( "#descContestacao"),					
				$btn_exclui			= $( "#btn-exclui"),
				$btn_contesta		= $( "#btn-contesta"),*/

				$contentImage       = $details.find(".image img");
				$lightboxImage      = $details.find(".image a");

				var liHidens = $(".image-gallery").find('li').not(":visible");
				console.log("lihidden: ",liHidens);
				liHidens.appendTo($(".image-gallery"));

				$contentImage.attr("src",content.urlImg);
				$lightboxImage.attr("href",content.urlImg);

				$detailsNomeloja.text(content.nomeloja);
				$detailsBairro.text(content.bairro);
				$detailsExposicao.text(content.exposicao);
				$detailsStatus.text( content.status );
				$detailsSenha.text( content.senha );
                $detailsMotivo.text(content.motivo);
                $detailsDtupload.text(content.dtupload);
                $detailsCoordenador.text(content.coordenador);
/*				$detailsID.text( content.id );
				$detailsSenha.text(content.senha);
				$detailsSupervisor.text(content.supervisor);
				$detailsPromotor.text(content.promotor);
				$detailsPdv.text(content.pdv);
				$detailsProduto.text(content.produto);
				$detailsAva.text(content.ava);  
				$detailsDia.text(content.dia);
				$detailsExposicao.text(content.exposicao);
				$detailsShare.text(content.share);
				$detailsDivisao.text(content.divisao);
				$detailsFormato.text(content.formato);
				$detailsCanal.text(content.canal);
				$detailsStatus.text(content.status);
				$detailsMotivo.text(content.motivo);
				$detailsMotivo_obs.text(content.motivo_obs);


				if(content.exclui){
					if($btn_exclui.hasClass("hidden"))
						$btn_exclui.removeClass("hidden");
				}else{
					if(!$btn_exclui.hasClass("hidden"))
						$btn_exclui.addClass("hidden");
				}
				if(content.contesta){
					if($btn_contesta.hasClass("hidden"))
						$btn_contesta.removeClass("hidden");
				}else{
					if(!$btn_contesta.hasClass("hidden"))
						$btn_contesta.addClass("hidden");
				}
*/

					//Clona o box de detalhes original
					var $cloneDetails = $details.clone();
					//var $cloneDetails = $details;
					//Remove a classe que faz a li criar a seta indicando qual foi clicada
					$(".image-thumb").removeClass("image-thumb");
					//verifica se existe um box de detalhes dentro da galeria
					if(self.$element.find( ".image-details" ).get(0)){
						//Some com o box de detalhes de dentro da galeria
						self.$element.find( ".image-details" ).slideUp( "fast",function(){
							//!O código entra aqui apenas quando termina de fazer o slideUp do box do detalhe
							//Remove Box de Detalhes
							$(".image-gallery").find( ".image-details" ).remove();
							//console.log("fechou")
							var liHidden = self.$element.find("li:hidden").length;
							console.log('qtd li hidden: ', liHidden)
							//Captura o index da li que foi clicada
							var indexList = $li.index();							
							//verifica se é a ultima da linha
							if((indexList+1)%4 == 0 || !$li.next().get(0) || $li.next().is(":hidden")){
								console.log(indexList%4,!$li.next().get(0))
								$lastElementLine = $li //se for a ultima o box detalhe vai entrar logo apos ela mesmo								
							}else{
								//se não for faz os calculos necessarios para encontrar a ultima li da linha e adicionar o box de detalhes apos
								var qtdColunas = 4,
								indexLastLine = parseInt(indexList / qtdColunas),
								indexLastElementLine = indexLastLine*qtdColunas + 3,
								$lastElementLine = self.$element.children("li:eq("+ indexLastElementLine +")");
								if(!$lastElementLine.get(0)){
									$lastElementLine = self.$element.children("li:last");
								}
							}
							
							// //Insere os box de detalhes apos a ultima li da linha

							//setTimeout(function(){
								$lastElementLine.after($cloneDetails);
								$cloneDetails.slideDown( "fast",function(){
									$li.addClass("image-thumb");
									window.theme.Nav.scrollToTarget(".image-details",100)
								});
							//},3000)
							
							$('.owl-carousel-details:not(.manual)').each(function() {
								var $this = $(this),
								opts;

								var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
								if (pluginOptions)
									opts = pluginOptions;

							   // console.log(opts)
							   $this.themePluginCarousel(opts);
							});
							$('.lightbox:not(.manual)').each(function() {
								var $this = $(this),
								opts;

								var pluginOptions = theme.fn.getOptions($this.data('plugin-options-lightbox'));
								if (pluginOptions)
									opts = pluginOptions;

								$this.themePluginLightbox(opts);
							});
							self.close();
						});
					}else{
						var liHidden = self.$element.find("li:hidden").length;
						console.log('qtd li hidden: ', liHidden);
						//Captura o index da li que foi clicada
						var indexList = $li.index();							
						//verifica se é a ultima da linha
						if((indexList+1)%4 == 0 || !$li.next().get(0) || $li.next().is(":hidden")){
							console.log(indexList%4,!$li.next().get(0))
							$lastElementLine = $li //se for a ultima o box detalhe vai entrar logo apos ela mesmo								
						}else{
							console.log("indexList",indexList,"é a ultima",!$li.next().get(0))
							//se não for faz os calculos necessarios para encontrar a ultima li da linha e adicionar o box de detalhes apos
							var qtdColunas = 4;
							var indexLastLine = parseInt(indexList / qtdColunas);
							var indexLastElementLine = indexLastLine*qtdColunas + 3
							var $lastElementLine = self.$element.children("li:eq("+ indexLastElementLine +")")

							if(!$lastElementLine.get(0)){
								console.log('ultima linha',$lastElementLine = self.$element.children("li:last"));
								$lastElementLine = self.$element.children("li:last");
							}
						}
						
						$lastElementLine.after($cloneDetails);
						$cloneDetails.slideDown( "fast",function(){
							$li.addClass("image-thumb");
							window.theme.Nav.scrollToTarget(".image-details",100)							
						});
						$('.owl-carousel-details:not(.manual)').each(function() {
							var $this = $(this),
							opts;

							var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
							if (pluginOptions)
								opts = pluginOptions;

						   // console.log(opts)
						   $this.themePluginCarousel(opts);
						});
						$('.lightbox:not(.manual)').each(function() {
							var $this = $(this),
							opts;

							var pluginOptions = theme.fn.getOptions($this.data('plugin-options-lightbox'));
							if (pluginOptions)
								opts = pluginOptions;

							$this.themePluginLightbox(opts);
						});
						self.close();
					}

					

					// //var $imgDetails = $( ".image-details" );
					// var qtdColunas = 4;
					// var indexLastLine = parseInt(indexList / qtdColunas);
					// var indexLastElementLine = indexLastLine*qtdColunas + 3

					// var $lastElementLine = self.$element.children("li:eq("+ indexLastElementLine +")")

					// var $cloneDetails = $details.clone();


					// console.log(indexLastLine,indexLastElementLine,indexList);
					// //$details.slideUp( "fast" ).remove();

					
					// $lastElementLine.after($cloneDetails);
					// $cloneDetails.slideDown( "fast" );

					// // self.$element.find( ".image-details" ).slideUp( "fast" );
					// ////self.$element.next( ".image-details" ).slideUp( "fast" );
				});



},
close: function() {
	var self = this;
			//console.log("close");
			$(".image-gallery .image-details-close").on( "click", function( e ) {
				e.preventDefault();
				console.log("fechou")
				$(".image-thumb").removeClass("image-thumb");
				$( this ).parent().slideUp( "fast" , function(){
					$(this).remove();
				})
				
			});
		}	
	};	
	var preview = new $.imagePreview(".image-gallery");
})( jQuery );