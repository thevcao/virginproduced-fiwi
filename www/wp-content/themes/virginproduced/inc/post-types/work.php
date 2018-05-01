<?php
// Example custom post type

 $properties = new CPT(
     array(
         'post_type_name' => 'work',
         'singular'       => 'Work',
         'plural'         => 'Work',
         'slug'           => 'the-goods',
     ),
     array(
        'supports' => array(
           'title', 'thumbnail'
        ),
        'public' => false,
        'show_ui' => true,
        'taxonomies'          => array( ),
        'has_archive' => true,
        'show_in_rest'       => true,
        'rest_base'          => 'goods',
        'rest_controller_class' => 'WP_REST_Posts_Controller',

     )
 );

 $properties->menu_icon("dashicons-video-alt2");
