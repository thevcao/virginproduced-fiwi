<?php /**
 * @package FIWI Login V2
 * @version 1.0
 */
/*
Plugin Name:   FIWI Login V2
Description:   Redirects a user to the login page if the user is not logged in. After login the user gets redirected to the original entry page.
Author:        Findsome Winmore
Version:       1.0
License:       GPL-2.0 or later
License URI:   http://www.gnu.org/licenses/gpl-2.0.txt
*/

/**
 * Redirects a user to the login page if not logged in.
 *
 */



add_action( 'parse_request', 'dmk_redirect_to_login_if_not_logged_in', 1 );


function dmk_redirect_to_login_if_not_logged_in() {

$url = $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];


if (strpos($url,'staging') !== false) {
    is_user_logged_in() || auth_redirect();
}
if (strpos($url,'production') !== false) {
    is_user_logged_in() || auth_redirect();
}


if( have_rows('server_ip', 'options') ):
while ( have_rows('server_ip', 'options') ) : the_row();

$value = get_sub_field('server_domain','options');


if (strpos($url, $value) !== false) {
    is_user_logged_in() || auth_redirect();
}

endwhile; endif;

}

add_action('init', 'serverprotect_settings');
function serverprotect_settings() {
    if (function_exists('acf_add_options_page')) {
        $page = acf_add_options_page(array(
            'menu_title' => 'Server Protection',
            'menu_slug' => 'server-settings',
            'capability' => 'edit_posts',
            'redirect' => false
        ));
    }

}


add_action('init', 'server_fields');
function server_fields() {
if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array (
    'key' => 'group_5911e02cd244e',
    'title' => 'Server Protection',
    'fields' => array (
        array (
            'key' => 'field_5911e03def0e3',
            'label' => 'Protected Server',
            'name' => 'server_ip',
            'type' => 'repeater',
            'instructions' => 'Add Server IP or Domain Name to redirect unauthorized users.',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array (
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'collapsed' => '',
            'min' => 0,
            'max' => 0,
            'layout' => 'table',
            'button_label' => '',
            'sub_fields' => array (
                array (
                    'key' => 'field_5911e0a3ef0e5',
                    'label' => 'Server/Domain',
                    'name' => 'server_domain',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array (
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'maxlength' => '',
                ),
            ),
        ),
    ),
    'location' => array (
        array (
            array (
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'server-settings',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'seamless',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
));

endif;

}
add_filter( 'login_url', 'dmk_strip_loggedout', 1, 1 );
/**
 * Strips '?loggedout=true' from redirect url after login.
 *
 * @author Daan Kortenbach
 *
 * @param  string $login_url
 * @return string $login_url
 */
function dmk_strip_loggedout( $login_url ) {
    return str_replace( '%3Floggedout%3Dtrue', '', $login_url );
}


function fiwi_login_redirect_notice() {


$url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
if (strpos($url,'wp-admin') == false && strpos($url,'staging') !== false):
    echo "<script>jQuery('document').ready(function(){jQuery('body').addClass('fiwi-redirected-user');});</script>";
endif;

}

add_action( 'login_head', 'fiwi_login_redirect_notice' );

function fiwi_login_styles() {?>
    <style>
            .login label {
        font-size: 0;
    }


</style>
    <script>
        jQuery('document').ready(function(){
            jQuery('body').addClass('fiwi-login');
            jQuery('#user_login').attr( 'placeholder', 'Username' );
            jQuery('#user_pass').attr( 'placeholder', 'Password' );
        });
</script>

<?php }

add_action( 'login_head', 'fiwi_login_styles' );
