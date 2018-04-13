<?php
/**
 * The template for displaying the header
 *
 * @package Smores
 * @since Smores 2.0
 */
?>
<!doctype html>
<html <?php language_attributes(); ?> prefix="og: http://ogp.me/ns#">
<head>
<title></title>
<meta charset="utf-8" >
<meta itemprop="name">
<meta property="og:title">
<meta name="twitter:title">
<meta name="description"/>
<meta itemprop="description">
<meta property="og:description">
<meta name="twitter:description">
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-touch-fullscreen" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="=<?php echo get_template_directory_uri(); ?>/dist/img/favicons/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/apple-touch-icon-152x152.png" />
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/favicon-16x16.png" sizes="16x16" />
<meta name="application-name" content="&nbsp;"/>
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="<?php echo get_template_directory_uri(); ?>/dist/img/favicons/mstile-310x310.png" />
<script type="text/javascript" src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/skrollr@0.6.26/dist/skrollr.min.js"></script>
<script src='https://www.google.com/recaptcha/api.js'></script>
<script src='https://s3.amazonaws.com/fw-devtools/cssbrowserselector/cssbrowserselector.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.3/ofi.min.js'></script>
<script src='https://s3.amazonaws.com/fw-devtools/object-fit-videos/object-fit-videos.min.js'></script>

<?php wp_head(); ?>
</head>

<body <?php //body_class(); ?>>
