$(function(){
	console.log( 'Do you know what is “up dog”? Our servers. We like to keep it that way too, server familiarity is a plus.' );

	$('td.checks').on('click', function(){
		if( $(this).hasClass('checked') ){
			$(this).html('');
			$(this).removeClass('checked');
		} else {
			$(this).html('<i class="fa fa-check"></i>')
			$(this).addClass('checked')
		}
	});

});