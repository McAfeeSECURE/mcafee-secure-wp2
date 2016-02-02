jQuery(function(){
    var $activationSection = jQuery("#mcafeesecure-activation");
    var $dashboardSection = jQuery("#mcafeesecure-dashboard");
    var $data = jQuery("#mcafeesecure-data");

    var host = $data.attr('data-host');
    console.log(host);
    if(!host){ host = '';}

    var email = $data.attr('data-email');
    console.log(host);
    if(!email){ email = '';}

    var endpointUrl = 'https://staging02.pathdefender.com';
    var apiUrl = endpointUrl + '/rpc/ajax?do=lookup-site-status&jsoncallback=?&rand='+new Date().getTime()+'&host=' + encodeURIComponent(host)

    jQuery("#activate-now").click(function(){
        var left = window.innerWidth / 2 - 250;
        var top = 200;
        var signupUrl = endpointUrl + "/app/wordpress2/signup?host=" + encodeURIComponent(host) + "&email=" + encodeURIComponent(email)
        var signupWindow = window.open(signupUrl, "_blank", "width=500 height=600 left=" + left + " top=" + top);
    });

    function refresh(){
        jQuery.getJSON(apiUrl,function(data) {
            console.log("lookup-site-status");
            console.log(data);

            var status = data['status'];

            if(status === 'none'){
                $activationSection.show();
            }else{
                var pro = data['isPro'];
                $dashboardSection.show();
            }
        });
    }

    var refreshInterval = setInterval(refresh, 1000);
});