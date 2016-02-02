<?php
$assets = WP_PLUGIN_URL . '/mcafee-secure/js/';
$email = get_option( 'admin_email' );;
$partner = 'wp-generic';
$affiliate = '221269';
$arrHost = parse_url(home_url('', $scheme = 'http'));
$host = $arrHost['host'];
?>
<script src="<?php echo $assets; ?>jquery.min.js"></script>
<script src="<?php echo $assets; ?>mcafeesecure.js"></script>
<div class="wrap" id="mcafeesecure-data">
    <div id="mcafeesecure-data" data-host="<? echo $host; ?>" data-email="<? echo $email; ?>"></div>

    <div id="mcafeesecure-activation" style="display: none;">
        <h1>McAfee SECURE Activation</h1>
        <br/>
        <input type="submit" name="submit" class="button button-primary" value="Activate Now" id="activate-now"></p>
    </div>

    <div id="mcafeesecure-dashboard" style="display: none;">
        <h1>McAfee SECURE Dashboard</h1>
        <br/>
        <input type="submit" name="submit" class="button button-primary" value="Activate Now" id="activate-now"></p>
    </div>
</div>