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

    // host = "dennissuratna.com"

    var endpointUrl = 'https://staging02.pathdefender.com';
    var apiUrl = endpointUrl + '/rpc/ajax?do=lookup-site-status&jsoncallback=?&rand='+new Date().getTime()+'&host=' + encodeURIComponent(host)

    jQuery("#activate-now").click(function(){
        var left = window.innerWidth / 2 - 250;
        var top = 200;
        var signupUrl = endpointUrl + "/app/wordpress2/signup?host=" + encodeURIComponent(host) + "&email=" + encodeURIComponent(email)
        var signupWindow = window.open(signupUrl, "_blank", "width=500 height=600 left=" + left + " top=" + top);
    });

    // McAfee SECURE
    function renderSecurity(data){
        var issuesFound = data['diagnosticsFoundIssues'] === 1;
        var $security = jQuery("#security");
        var secure = data['isSecure'] === 1
        var inProgress = data['scanInProgress'] === 1

        if(inProgress){
            setStatusText($security, "Security Scan In Progress." );
            spinIcon($security);
        }else{
            if(secure){
                setStatusText($security, "All tests passed!" );
                checkIcon($security);
            }else{
                setStatusText($security, "Security Problems!");
                timesIcon($security);
            }   
        }
    }

    function renderCertificationTrustmark(data){
        var $certification = jQuery("#certification");
        var exceeded = data['maxHitsExceeded'] === 1;
        if(exceeded){
            setStatusText($certification, "Monthly Visitor Limit Reached.");
            timesIcon($certification);
        }else{
            setStatusText($certification, "All good.");
            checkIcon($certification);
        }
    }

    function renderSearchHighlighting(data){
        var pro = data['isPro'] === 1;
        var $highlighting = jQuery("#highlighting");

        if(pro){
            setStatusText($highlighting, "Site is highlighted in Google, Yahoo, and Bing search results.");
            checkIcon($highlighting);
        }else{
            pillGrey($highlighting);
            setStatusText($highlighting, "Enable highlighting in Google, Yahoo, and Bing search results.");
            timesIcon($highlighting);
        }
    }

    function renderEngagementTurstmark(data){
        var pro = data['isPro'] === 1;
        var $engagement = jQuery("#engagement");

        if(pro){
            var installed = data['tmEngagementInstalled'] === 1;

            if(installed){
                setStatusText($engagement, "Active");
                checkIcon($engagement);
            }else{
                setStatusText($engagement, "Not Installed");
                timesIcon($engagement);
            }
        }else{
            pillGrey($engagement);
            setStatusText($engagement, "Enable the engagement trustmark to boost visitor confidence.");
            timesIcon($engagement);
        }
    }

    // TrustedSite
    function renderSiteReviews(data){
        
    }

    function renderSitemap(data){
        var pro = data['isPro'] === 1;
        var $sitemap = jQuery("#sitemap");
        
        if(pro){
            var createdDate = data['sitemapCreatedDate'];
            var numPages = data['sitemapUrlCount'];

            if(createdDate){
                var dateStr = createdDate.split(" ")[0];
                var d = new Date(dateStr);
                var daysAgo = 0;

                setStatusText($sitemap, 'Created <b class="days-ago">' + daysAgo + ' days ago</b>.  Contains <b class="num-pages">' + numPages + '</b> pages.');
            }

        }else{
            pillGrey($sitemap);
            setStatusText($sitemap, "Get your site in Google, Yahoo, Bing and more.");
            timesIcon($sitemap);
        }
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

    function spinIcon($el){
        $el.find('.status-icon').html("");
        $el.find('.status-icon').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
    }



    function refresh(){
        jQuery.getJSON(apiUrl,function(data) {
            console.log("lookup-site-status");
            console.log(data);

            var status = data['status'];

            if(status === 'none'){
                $activationSection.show();
            }else{
                renderSecurity(data);
                renderCertificationTrustmark(data);
                renderSearchHighlighting(data);
                renderEngagementTurstmark(data);

                renderSiteReviews(data);
                renderSitemap(data);
                renderDiagnostic(data);
                renderProfile(data);

                $dashboardSection.show();
            }
        });
    }

    var refreshInterval = setInterval(refresh, 1000);
});