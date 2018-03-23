<?php
// Example custom post type

 $properties = new CPT(
     array(
         'post_type_name' => 'suits',
         'singular'       => 'suit',
         'plural'         => 'suits',
         'slug'           => 'our-suits',
     ),
     array(
        'supports' => array(
           'title', 'editor', 'thumbnail'
        ),
        'public' => true,
        'show_ui' => true,
        //         'taxonomies'          => array( 'category' ),
        'has_archive' => true,
        'show_in_rest'       => true,
        'rest_base'          => 'suits',
        'rest_controller_class' => 'WP_REST_Posts_Controller',

     )
 );

 $properties->menu_icon("dashicons-admin-users");
