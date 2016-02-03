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

        add_action( 'admin_enqueue_scripts', 'Mcafeesecure::admin_onboarding' );
        add_action( 'wp_ajax_mcafeesecure_get_data', 'Mcafeesecure::ajax_get_data' );
        add_action( 'wp_ajax_mcafeesecure_save_data', 'Mcafeesecure::ajax_save_data' );
    }

    public static function ajax_get_data(){
        error_log("ajax_get_data");
        error_log(json_encode(get_option('mcafeesecure_data', "{}")));

        echo json_encode(get_option('mcafeesecure_data', "{}"));
        wp_die();
    }

    public static function ajax_save_data(){
        error_log("ajax_save_data");
        error_log(json_encode($_POST['data']));

        echo json_encode(get_option('mcafeesecure_data', "{}"));
        wp_die();
    }

    public static function admin_onboarding($hook) {
        error_log("admin_onboarding called");

        if( 'plugins.php' != $hook ) {
            return;
        }

        error_log("admin_onboarding called 2");
        error_log(plugins_url('/js/onboarding.js', WP_PLUGIN_DIR . '/mcafee-secure/mcafee-secure.php' ));
            
        wp_enqueue_script( 'mcafeesecure-onboarding-script', plugins_url('/js/onboarding.js', WP_PLUGIN_DIR . '/mcafee-secure/mcafee-secure.php' ), array('jquery') );
        wp_enqueue_script( 'mcafeesecure-jquery-ui-js', plugins_url('/js/bootstrap.min.js', WP_PLUGIN_DIR . '/mcafee-secure/mcafee-secure.php' ), array('jquery') );
        wp_enqueue_style( 'mcafeesecure-jquery-ui-css', plugins_url('/css/bootstrap.min.css', WP_PLUGIN_DIR . '/mcafee-secure/mcafee-secure.php' ) );
        // wp_enqueue_style( 'mcafeesecure-override-css', plugins_url('/css/override.css', WP_PLUGIN_DIR . '/mcafee-secure/mcafee-secure.php' ) );

        $mcafeesecure_ajax_object = array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'data' => get_option('mcafeesecure_data', "{}") );

        wp_localize_script( 'mcafeesecure-onboarding-script', 'mcafeesecure_ajax_object', $mcafeesecure_ajax_object);
    }

    public static function deactivate(){
        delete_option("mcafeesecure_active");
        delete_option("mcafeesecure_data");
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