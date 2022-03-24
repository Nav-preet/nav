(function($) {
    "use strict";
$(document).ready(function() {
/* ----------------------------------------------------------- */
		/*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

		if ($('.grid').length) {
			new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
		}
       
        /* ----------------------------------------------------------- */
		/*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

		$(".grid figure").on('click', function() {
			$("#navbar-collapse-toggle").addClass('hide-header');
		});

		/* ----------------------------------------------------------- */
		/*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

		$(".nav-close").on('click', function() {
			$("#navbar-collapse-toggle").removeClass('hide-header');
		});
		$(".nav-prev").on('click', function() {
			if ($('.slideshow ul li:first-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});
		$(".nav-next").on('click', function() {
			if ($('.slideshow ul li:last-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});

       
        /* ----------------------------------------------------------- */
		/*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

		var item = $(".grid li figure");
		var elementsLength = item.length;
		for (var i = 0; i < elementsLength; i++) {
			$(item[i]).hoverdir();
		}
          
        /* ----------------------------------------------------------- */
		/*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

		$(".contactform").on("submit", function() {
            var valid;	
            valid = validateContact();
			$(".output_message").text("Sending...");
            var name = $("#name").val();
            var email = $("#email").val();
            var subject = $("#subject").val();
            var message = $("#message").val();
            const inputs = document.querySelectorAll('#name, #email,#subject, #message');
			if(valid){
                
                $.ajax({
                    url: "contact_mail.php",
                    method: "post",
                    data: "name="+name+"&email="+email+"&subject="+subject+"&message="+message,
                    success: function(result) {
                        if (result == "done") {
                            inputs.forEach(input => {
                                input.value = '';
                              });
                            $(".form-inputs").css("display", "none");
                            $(".box p").css("display", "none");
                            $(".contactform").find(".output_message").addClass("success");
                            $(".output_message").text("Message Sent!");
                            
                        } else {
                            $(".tabs-container").css("height", "440px");

                            $(".contactform").find(".output_message").addClass("error");
                            $(".output_message").text("Error Sending!");
                        }
                       
                    }
			    });
            }

			return false;
		});

        function validateContact() {
            var valid = true;	
            $(".no-error").css('border-color','');
            $(".name-error").html("");
            $(".email-error").html("");
            $(".subject-error").html("");
            $(".message-error").html("");
            if(!$("#name").val()) {
                $(".name-error").html("(required)");
                $("#name").css('border-color','#ff0000c9');
                valid = false;
            }
            if(!$("#email").val()) {
                $(".email-error").html("(required)");
                $("#email").css('border-color','#ff0000c9');
                valid = false;
            }
            if(!$("#email").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
                $(".email-error").html("(invalid)");
                $("#email").css('border-color','#ff0000c9');
                valid = false;
            }
            if(!$("#subject").val()) {
                $(".subject-error").html("(required)");
                $("#subject").css('border-color','#ff0000c9');
                valid = false;
            }
            if(!$("#message").val()) {
                $(".message-error").html("(required)");
                $("#message").css('border-color','#ff0000c9');
                valid = false;
            }
            return valid;
        }

    });
})(jQuery);


