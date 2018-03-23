<?php

/** Editor Functions */


function filter_post_data( $data , $postarr ) {


}

//Add TinyMCE Formats

// Callback function to insert 'styleselect' into the $buttons array
function my_mce_buttons_2( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
// Register our callback to the appropriate filter
add_filter('mce_buttons_2', 'my_mce_buttons_2');


// Callback function to filter the MCE settings
function my_mce_before_init_insert_formats( $init_array ) {
    // Define the style_formats array
    $style_formats = array(
        // Each array child is a format with it's own settings
//        array(
//            'title' => 'Button',
//            'selector' => 'a',
//            'classes' => 'btn btn--secondary btn--large'
//        ),
//        array(
//            'title' => 'Serif Font',
//            'selector' => 'h1, h2, h3, h4, h5',
//            'classes' => 'serif'
//        ),
//        array(
//            'title' => 'Caption',
//            'selector' => 'p',
//            'classes' => 'caption'
//        ),
//        array(
//            'title' => 'Disclaimer',
//            'selector' => 'p',
//            'classes' => 'disclaimer'
//        ),
        array(
          'title'     => 'Button List',
          'selector'  => 'ul',
          'classes'   => 'two-column-list'
        ),
        array(
            'title' => 'Button',
            'selector' => 'a',
            'classes' => 'btn'
        ),
    );
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );

    return $init_array;

}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );
