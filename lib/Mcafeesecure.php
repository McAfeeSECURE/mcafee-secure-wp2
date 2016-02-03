<?php
defined( 'ABSPATH' ) OR exit;

class Mcafeesecure {

    public static function activate(){
        update_option('mcafeesecure_active', 1);
    }

    public static function install(){
        add_shortcode('mcafeesecure', 'Mcafeesecure::engagement_trustmark_shortcode');
        add_action('admin_menu', 'Mcafeesecure::admin_menus');
        add_action('wp_footer', 'Mcafeesecure::inject_code');
    }

    public static function deactivate(){
        delete_option("mcafeesecure_active");
    }

    public static function uninstall(){
    }

    public static function engagement_trustmark_shortcode($atts = array()) {
        $a = shortcode_atts(array(
            'width' => 90,
        ), $atts);

        $width = intval($a['width']);
        $width = min(max(60, $width), 120);
        return "<script src='https://cdn.ywxi.net/js/inline.js?w=" . $width . "'></script>";
    }

    public static function admin_menus(){
        add_menu_page(
            'McAfee SECURE', 
            'McAfee SECURE', 
            'activate_plugins', 
            'mcafee-secure-settings', 
            'Mcafeesecure::settings_page', 
            plugins_url() .'/mcafee-secure/images/mcafee-secure-16x16.png');
    }

    public static function settings_page(){
        require WP_PLUGIN_DIR . '/mcafee-secure/lib/settings_page.php';
    }

    public static function inject_code(){

        echo <<<EOT
            <script type="text/javascript">
              (function() {
                var sa = document.createElement('script'); sa.type = 'text/javascript'; sa.async = true;
                sa.src = ('https:' == document.location.protocol ? 'https://cdn' : 'http://cdn') + '.ywxi.net/js/1.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sa, s);
              })();
            </script>
EOT;
    }
}

?>