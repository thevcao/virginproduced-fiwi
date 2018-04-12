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
        array(
            'title' => 'Large',
            'selector'  => 'h1, h2, h3, h4, h5',
            'classes' => 'large'
        ),
        array(
            'title' => 'Large Glitched',
            'selector'  => 'h1, h2, h3, h4, h5',
            'classes' => 'glitching'
        ),
        array(
            'title' => 'Large Glitched - Inline',
            'selector'  => 'h1, h2, h3, h4, h5',
            'classes' => 'glitching',
            'inline' => 'span',

        ),
        array(
            'title' => 'Headline',
            'selector'  => 'h1, h2, h3, h4, h5',
            'classes' => 'headline'
        ),
        array(
          'title'     => 'Red Title',
          'selector'  => 'h1, h2, h3, h4, h5',
          'inline' => 'span',
          'classes' => 'vipr-red'
        ),
        array(
            'title' => 'Button w Arrow',
            'selector' => 'a',
            'classes' => 'btn btn-arrow-right'
        ),
        array(
            'title' => 'Image Block Right',
            'selector' => 'img',
            'classes' => 'block right'
        ),
    );
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );

    return $init_array;

}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );
