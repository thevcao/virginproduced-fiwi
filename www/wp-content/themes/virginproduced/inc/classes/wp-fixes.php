<?php /** General WP Clean Up Fixes **/

if(!function_exists('fix_svg')) {
add_filter( 'wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {

global $wp_version; if( $wp_version == '4.7' || ( (float) $wp_version < 4.7 ) ) { return $data; }

$filetype = wp_check_filetype( $filename, $mimes );

return [ 'ext' => $filetype['ext'], 'type' => $filetype['type'], 'proper_filename' => $data['proper_filename'] ];

}, 10, 4 );

function cc_mime_types( $mimes ){ $mimes['svg'] = 'image/svg+xml'; return $mimes; } add_filter( 'upload_mimes', 'cc_mime_types' );

function fix_svg() { echo '<style> .attachment-266×266, .thumbnail img {} </style>'; } add_action( 'admin_head', 'fix_svg' );
}
//add_filter('get_user_option_admin_color', 'change_admin_color');
//function change_admin_color($result) {
//return 'midnight';
//}

require_once(ABSPATH . 'wp-admin/includes/plugin.php');
require_once(ABSPATH . 'wp-admin/includes/file.php');
if (file_exists(WP_PLUGIN_DIR . '/hello.php'))
  delete_plugins(array('hello.php'));


$post = get_page_by_path('hello-world',OBJECT,'post');
if ($post)
  wp_delete_post($post->ID,true);


$post = get_page_by_path('sample-page',OBJECT,'page');
if ($post)
  wp_delete_post($post->ID,true);


if(!function_exists('change_howdy')) {
function change_howdy($translated, $text, $domain) {

    if (!is_admin() || 'default' != $domain)
        return str_replace('Howdy', 'Hay 👋', $translated);

    if (false !== strpos($translated, 'Howdy'))
        return str_replace('Howdy', 'Hay 👋', $translated);

    return $translated;
}
add_filter('gettext', 'change_howdy', 10, 3);
}

//add_filter( 'wp_insert_post_data' , 'filter_post_data' , '99', 2 );
