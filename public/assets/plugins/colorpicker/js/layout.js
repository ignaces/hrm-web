(function($){
	var initLayout = function() {
		var hash = window.location.hash.replace('#', '');
		
		$('#cp1').ColorPicker({
			onSubmit: function(hsb, hex, rgb, el) {
				$(el).val(hex);
				$(el).ColorPickerHide();
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			}
		})
		.bind('keyup', function(){
			$(this).ColorPickerSetColor(this.value);
		});
		
	};
	
	
	EYE.register(initLayout, 'init');
})(jQuery)