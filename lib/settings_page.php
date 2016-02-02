<?php
$jsFolder = WP_PLUGIN_URL . '/mcafee-secure/js/';
$cssFolder = WP_PLUGIN_URL . '/mcafee-secure/css/';
$email = get_option( 'admin_email' );;
$partner = 'wp-generic';
$affiliate = '221269';
$arrHost = parse_url(home_url('', $scheme = 'http'));
$host = $arrHost['host'];
$endpointUrl = 'https://staging02.pathdefender.com';
?>
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
<script src="<?php echo $jsFolder; ?>jquery.min.js"></script>
<script src="<?php echo $jsFolder; ?>mcafeesecure.js"></script>

<link rel="stylesheet" href="<?php echo $cssFolder; ?>common.css" type="text/css">
<link rel="stylesheet" href="<?php echo $cssFolder; ?>user.css" type="text/css">
<link rel="stylesheet" href="<?php echo $cssFolder; ?>settings.css" type="text/css">
<link rel="stylesheet" href="<?php echo $cssFolder; ?>override.css" type="text/css">

<div class="wrap" id="mcafeesecure-container">
    <div id="mcafeesecure-data" data-host="<?php echo $host; ?>" data-email="<?php echo $email; ?>"></div>

    <div id="mcafeesecure-activation" style="display: none;">
        <h1>McAfee SECURE Activation</h1>
        <br/>
        <input type="submit" name="submit" class="button button-primary" value="Activate Now" id="activate-now"></p>
    </div>

    <div id="mcafeesecure-dashboard" style="display: none;">
        <h1>McAfee SECURE</h1>
        <br/>

        <div class="wrapper">
            <div id="content">
                <div class="row row-toggle" data-toggle-key="mfes-security">
                    <div class="row-title"><i class="fa fa-check"></i><b>Security</b></div>
                    All tests passed!
                </div>

                <div class="row row-toggle" href-linked="1">
                    <a href="javascript:void(0);">Go Unlimited</a>
                    <div class="row-title"><i class="fa fa-check"></i><b>Certification Trustmark</b></div>
                    All Good
                </div>

                <div class="row lite" href-linked="1">
                    <a href="javascript:void(0);">Learn More</a>
                    <div class="row-title"><i class="fa fa-times"></i><b>Search Highlighting</b></div>

                    <div class="pill pill-grey">Pro Feature</div> Enable highlighting in Google, Yahoo, and Bing search results.
                </div>

                <div class="row lite" href-linked="1">
                    <a href="javascript:void(0);">Learn More</a>
                    <div class="row-title"><i class="fa fa-times"></i><b>Engagement Trustmark</b></div>

                    <div class="pill pill-grey">Pro Feature</div> Enable the engagement trustmark to boost visitor confidence.
                </div>

            </div>    
        </div>
        
        <br/>

        <h1>TrustedSite</h1>
        <br/>

        <div class="wrapper">
            <div id="content">
                <div class="row" href="<?php echo $endpointUrl; ?>/user/site/ratings?siteId=2366096" href-linked="1">
                    <a href="javascript:void(0);">View Details</a>
                    <div class="row-title"><i class="fa fa-check"></i><b>Site Reviews</b></div> 
                    <div class="dot-yellow"></div> No Reviews
                </div>

                <div class="row" href="<?php echo $endpointUrl; ?>/user/site/sitemap?siteId=982208" href-linked="1">
                    <a href="javascript:void(0);">View Details</a>
                    <div class="row-title"><i class="fa fa-check"></i><b>Sitemap</b></div>
                    Created <b>3 days ago</b>.  Contains <b>59</b> pages.
                </div>

                <div class="row" href="<?php echo $endpointUrl; ?>/user/site/diagnostics?siteId=982208" href-linked="1">
                    <a href="javascript:void(0);">View Details</a>
                    <div class="row-title"><i class="fa fa-times"></i><b>Diagnostics</b></div>
                    3 issues found.
                </div>

                <div class="row" href="<?php echo $endpointUrl; ?>/user/site/directory?siteId=982208" href-linked="1">
                    <a href="javascript:void(0);">Edit Profile</a>
                    <div class="row-title"><i class="fa fa-check"></i><b>Website Profile</b></div>
                    All good!
                </div>
            </div>    
        </div>
    </div>
</div>