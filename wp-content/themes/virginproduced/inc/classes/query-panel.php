<?php
/** FIWI Query Panel */



function add_queried_object_panel_to_dom() {
    global $wp_query;
    $query_vars = $wp_query->query_vars;
    $queried_object = get_queried_object();
    $acf = get_fields();
?>

    <div class="fiwi-qo-panel">
        <div class="fiwi-qo-panel__inner">
            <div class="fiwi-qo-panel__indicator">
                <i class="fa fa-plus"></i>
            </div>
            <div class="fiwi-qo-panel__content">
                <h2 style="margin-bottom; 2rem">Queried Object</h2>
                <hr>
                <pre style='font-family: "monospace"; background-color: white;'>
                    <?php print_r($queried_object); ?>
                </pre>
                <hr>
                <h2 style="margin; 2rem 0">Query Vars</h2>
                <hr>
                <pre style='font-family: "monospace"; background-color: white;'>
                    <?php print_r($query_vars); ?>
                </pre>
                <h2 style="margin; 2rem 0">ACF Fields</h2>
                <hr>
                <pre style='font-family: "monospace"; background-color: white;'>
                    <?php print_r($acf); ?>
                </pre>
            </div>
        </div>
    </div>

    <script>
//        jQuery(document).ready(function($){
//            $('.fiwi-qo-panel__indicator').on('click', function(){
//                $('body').toggleClass('fiwi-qo-panel-in');
//            });
//        });
    </script>

<?php
}


$url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];



if (strpos($url,'dev') !== false) {
add_action( 'wp_footer', 'add_queried_object_panel_to_dom', 100 );
}

if (strpos($url,'local') !== false) {
add_action( 'wp_footer', 'add_queried_object_panel_to_dom', 100 );
}
