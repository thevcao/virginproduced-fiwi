<?php
/**
 * VueWP functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package VueWP
 */





if ( ! function_exists( 'vuewp_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */



function vuewp_setup() {
    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     * If you're building a theme based on VueWP, use a find and replace
     * to change 'vuewp' to the name of your theme in all the template files.
     */


    load_theme_textdomain( 'vuewp', get_template_directory() . '/languages' );

    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    /*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support( 'title-tag' );

    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support( 'post-thumbnails' );

    // This theme uses wp_nav_menu() in one location.
    register_nav_menus( array(
        'primary' => esc_html__( 'Primary', 'vuewp' ),
    ) );

    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );

    // Set up the WordPress core custom background feature.
    add_theme_support( 'custom-background', apply_filters( 'vuewp_custom_background_args', array(
        'default-color' => 'ffffff',
        'default-image' => '',
    ) ) );
}
endif;
add_action( 'after_setup_theme', 'vuewp_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function vuewp_content_width() {
    $GLOBALS['content_width'] = apply_filters( 'vuewp_content_width', 640 );
}
add_action( 'after_setup_theme', 'vuewp_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function vuewp_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Sidebar', 'vuewp' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Add widgets here.', 'vuewp' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );
}
add_action( 'widgets_init', 'vuewp_widgets_init' );

// Add Categories Name to the API Response
add_action( 'rest_api_init', 'wp_rest_insert_tag_links' );

function wp_rest_insert_tag_links(){

    register_rest_field( 'post',
        'post_categories',
        array(
            'get_callback'    => 'wp_rest_get_categories_links',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

function wp_rest_get_categories_links($post){
    $post_categories = array();
    $categories = wp_get_post_terms( $post['id'], 'category', array('fields'=>'all') );

foreach ($categories as $term) {
    $term_link = get_term_link($term);
    if ( is_wp_error( $term_link ) ) {
        continue;
    }
    $post_categories[] = array('term_id'=>$term->term_id, 'name'=>$term->name, 'link'=>$term_link);
}
    return $post_categories;

}



define("THEME_ROOT", get_stylesheet_directory());

require get_template_directory() . '/inc/classes/OldFashioned.php';

use OldFashioned\OldFashioned;

require_once __DIR__ . '/inc/vendor/autoload.php';

$OldFashioned = new OldFashioned(
    array( // Includes
        'inc/admin',         // Add admin scripts
        'inc/ajax',          // Add ajax scripts
        'inc/classes',       // Add classes
        'inc/custom-fields', // Add custom field scripts
        'inc/forms',         // Add form scripts
        'inc/images',        // Add images scripts
        'inc/post-types',    // Add post type scripts
        'inc/shortcodes',    // Add shortcode scripts
        'inc/widgets',       // Add widget scripts
    ),
    array( // Assets
        'css'             => '/dist/css/custom.min.css',
)

);





//function prefix_add_footer_styles() {
//    wp_enqueue_style( 'vuewp-style', get_template_directory_uri() . '/dist/css/custom.min.css' );
//};
//add_action( 'get_footer', 'prefix_add_footer_styles' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * ACF Data in Post Object Response
 */

$types = ['post', 'page', 'work'];

foreach ($types as $type) {
  add_filter( 'acf/rest_api/'.$type.'/get_fields', function( $data, $response ) use ($types) {

    if ( $response instanceof WP_REST_Response ) {
      $data = $response->get_data();
    }

    array_walk_recursive( $data, 'deepIncludeACFFields', $types );

    return $data;

  }, 10, 3 );
}

function deepIncludeACFFields( &$item, $key, $postTypes ) {
  if ( isset( $item->post_type ) && in_array( $item->post_type, $postTypes ) ) {
    $item->acf = get_fields( $item->ID );
  }
}

function override_mce_options($initArray) {
    $opts = '*[*]';
    $initArray['valid_elements'] = $opts;
    $initArray['extended_valid_elements'] = $opts;
    return $initArray;
} add_filter('tiny_mce_before_init', 'override_mce_options');



add_image_size( 'news_image', 800, 999999 );



add_filter( 'rest_endpoints', function( $endpoints ){
    if ( ! isset( $endpoints['/wp/v2/suits'] ) ) {
        return $endpoints;
    }
    $endpoints['/wp/v2/suits'][0]['args']['per_page']['default'] = 100;
    return $endpoints;
});


function disable_emojis() {
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
  add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
 }
 add_action( 'init', 'disable_emojis' );

 /**
  * Filter function used to remove the tinymce emoji plugin.
  *
  * @param array $plugins
  * @return array Difference betwen the two arrays
  */
 function disable_emojis_tinymce( $plugins ) {
  if ( is_array( $plugins ) ) {
  return array_diff( $plugins, array( 'wpemoji' ) );
  } else {
  return array();
  }
 }

 /**
  * Remove emoji CDN hostname from DNS prefetching hints.
  *
  * @param array $urls URLs to print for resource hints.
  * @param string $relation_type The relation type the URLs are printed for.
  * @return array Difference betwen the two arrays.
  */
 function disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
  if ( 'dns-prefetch' == $relation_type ) {
  /** This filter is documented in wp-includes/formatting.php */
  $emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );

 $urls = array_diff( $urls, array( $emoji_svg_url ) );
  }

 return $urls;
 }

// Disable support for comments and trackbacks in post types
// https://gist.github.com/mattclements/eab5ef656b2f946c4bfb
function df_disable_comments_post_types_support() {
    $post_types = get_post_types();
    foreach ($post_types as $post_type) {
        if(post_type_supports($post_type, 'comments')) {
            remove_post_type_support($post_type, 'comments');
            remove_post_type_support($post_type, 'trackbacks');
        }
    }
}
add_action('admin_init', 'df_disable_comments_post_types_support');
// Close comments on the front-end
function df_disable_comments_status() {
    return false;
}
add_filter('comments_open', 'df_disable_comments_status', 20, 2);
add_filter('pings_open', 'df_disable_comments_status', 20, 2);
// Hide existing comments
function df_disable_comments_hide_existing_comments($comments) {
    $comments = array();
    return $comments;
}
add_filter('comments_array', 'df_disable_comments_hide_existing_comments', 10, 2);
// Remove comments page in menu
function df_disable_comments_admin_menu() {
    remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'df_disable_comments_admin_menu');
// Redirect any user trying to access comments page
function df_disable_comments_admin_menu_redirect() {
    global $pagenow;
    if ($pagenow === 'edit-comments.php') {
        wp_redirect(admin_url()); exit;
    }
}
add_action('admin_init', 'df_disable_comments_admin_menu_redirect');
// Remove comments metabox from dashboard
function df_disable_comments_dashboard() {
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
}
add_action('admin_init', 'df_disable_comments_dashboard');
// Remove comments links from admin bar
function df_disable_comments_admin_bar() {
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
}
add_action('init', 'df_disable_comments_admin_bar');

add_filter( 'rest_cache_headers', function( $headers ) {
  $headers['Cache-Control'] = 'public, max-age=604800';

  return $headers;
} );
add_action( 'save_post', function( $post_id ) {
  if ( class_exists( 'WP_REST_Cache' ) ) {
    WP_REST_Cache::empty_cache();
  }
} );


function vipr_async_scripts($url)
{
    if ( strpos( $url, '#asyncload') === false )
        return $url;
    else if ( is_admin() )
        return str_replace( '#asyncload', '', $url );
    else
  return str_replace( '#asyncload', '', $url )."' async='async";
    }
add_filter( 'clean_url', 'vipr_async_scripts', 11, 1 );

/**
 * Enqueue scripts and styles.
 */
function vuewp_scripts() {
    wp_enqueue_script( 'ext-libraries', get_template_directory_uri() . '/dist/js/scripts.min.js#asyncload', array(), '', false );

    wp_enqueue_script( 'vuewp-common', get_template_directory_uri() . '/dist/js/common.min.js#asyncload', array(), '', true );
    wp_enqueue_script( 'vuewp-main', get_template_directory_uri() . '/dist/js/main.min.js#asyncload', array(), '', true );

    wp_enqueue_script( 'vuewp-vendor', get_template_directory_uri() . '/dist/js/vendor.min.js#asyncload', array(), '', true );
//    wp_enqueue_script( 'threejs', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/90/three.min.js', array(), '20151217', true );
//    wp_enqueue_script( 'rellax', 'https://cdnjs.cloudflare.com/ajax/libs/rellax/1.6.0/rellax.min.js', array(), '20151217', true );

}
add_action( 'wp_enqueue_scripts', 'vuewp_scripts' );
