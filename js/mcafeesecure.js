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

    function renderSecurity(data){

    }

    function renderCertificationTrustmark(data){

    }

    function renderSearchHighlighting(data){

    }

    function renderEngagementTurstmark(data){

    }

    function renderSiteReviews(data){

    }

    function renderSitemap(data){
        
    }

    function renderDiagnostic(data){
        var issuesFound = data['diagnosticsFoundIssues'] === 1;
        var $diagnostics = jQuery("#diagnostics");
        var pro = data['isPro'] === 1;

        if(pro){
            if(issuesFound){
                setStatusText($diagnostics, "Issues found.");
                timesIcon($diagnostics);
            }else{
                setStatusText($diagnostics, "All good.");
                checkIcon($diagnostics);
            }
        }else{
            pillGrey($diagnostics);
            setStatusText($diagnostics, "Keep your site looking flawless.");
            timesIcon($diagnostics);
        }
    }

    function renderProfile(data){
        var profileDone = data['profileDone'] === 1;
        var $profile = jQuery("#profile");

        if(profileDone){
            setStatusText($profile, "All good.");
            timesIcon($profile);
        }else{
            setStatusText($profile, "Complete your profile today.");
            warningIcon($profile);
        }
    }

    function setStatusText($el, statusText){
        $el.find(".status-text").html(statusText);
    }

    function pillGrey($el){
        $el.find(".pill-grey").show();
    }

    function checkIcon($el){
        $el.find('.status-icon').html("")
        $el.find('.status-icon').html('<i class="fa fa-check"></i>');
    }

    function timesIcon($el){
        $el.find('.status-icon').html("");
        $el.find('.status-icon').html('<i class="fa fa-times"></i>');
    }

    function warningIcon($el){
        $el.find('.status-icon').html("");
        $el.find('.status-icon').html('<i class="fa fa-warning"></i>');
    }

    function refresh(){
        jQuery.getJSON(apiUrl,function(data) {
            console.log("lookup-site-status");
            console.log(data);

            var status = data['status'];

            if(status === 'none'){
                $activationSection.show();
            }else{
                renderDiagnostic(data);
                renderProfile(data);

                $dashboardSection.show();
            }
        });
    }

    var refreshInterval = setInterval(refresh, 1000);
});