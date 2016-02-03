jQuery(function(){
    console.log("Onboarding !!!!");
    console.log(mcafeesecure_ajax_object);

    var obj = mcafeesecure_ajax_object;

    jQuery.post(obj.ajax_url, {action: 'mcafeesecure_get_data'}, function(resp){
        console.log("Get Data Callback");
        var data = JSON.parse(resp);
        console.log(data);

        if(!data['completed_onboarding']){
            showOnboardingModal();
        }
    });

    function showOnboardingModal(){
        console.log("Showing onboarding modal");

        var styleCss = "min-width: 210px; margin-left: 25px; border-radius: 0;";

        var $item = jQuery( "div.wp-menu-name:contains('McAfee SECURE')" );
        console.log($item.length);
        $item.popover({
            content: "You have installed McAfee SECURE. Click here to activate your account....",
            title: "Congratulations!",
            template: '<div class="popover" role="tooltip" style="' + styleCss + '"><div class="arrow" style="border-top-color:white;"></div><h3 class="popover-title" style="background-color:#aa0828; border-radius: 0; color: #ffffff;"></h3><div class="popover-content" style="color:#222; text-decoration:none;"></div></div>',
            html: true,
            trigger: 'manual',
            placement: 'top',
            viewport: { selector: 'body' }
        });
        $item.popover('show');
        console.log("Hello");
    }

    // var postData = {
    //     action: 'mcafeesecure_save_data',
    //     data: {test: 'test'}
    // };

    // var callback = function(response) {
    //     var $item = jQuery( "div.wp-menu-name:contains('McAfee SECURE')" );
    //     console.log("Callback");
    //     console.log(response);    
    // }

    // jQuery.post(obj.ajax_url, postData, callback);
})