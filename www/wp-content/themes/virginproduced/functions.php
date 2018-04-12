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


/**
 * Enqueue scripts and styles.
 */
function vuewp_scripts() {
//    wp_enqueue_script( 'ext-libraries', get_template_directory_uri() . '/dist/js/scripts.min.js', array(), '20151217', false );

    wp_enqueue_script( 'vuewp-common', get_template_directory_uri() . '/dist/js/common.min.js', array(), '20151217', true );
    wp_enqueue_script( 'vuewp-main', get_template_directory_uri() . '/dist/js/main.min.js', array(), '20151217', true );

    wp_enqueue_script( 'vuewp-vendor', get_template_directory_uri() . '/dist/js/vendor.min.js', array(), '20151217', true );
//    wp_enqueue_script( 'threejs', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/90/three.min.js', array(), '20151217', true );
//    wp_enqueue_script( 'rellax', 'https://cdnjs.cloudflare.com/ajax/libs/rellax/1.6.0/rellax.min.js', array(), '20151217', true );

}
add_action( 'wp_enqueue_scripts', 'vuewp_scripts' );


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
