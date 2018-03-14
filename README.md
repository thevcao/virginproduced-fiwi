# vuewp

An elegant, responsive SPA powered by VueJS and the Wordpress REST v2 API. Unlike archaic PHP templates which are hell to maintain, **vuewp** promises great developer experience while allowing you to tap onto the rich Wordpress plugin ecosystem.

This solution is trivial to deploy as a Wordpress theme. You can also decouple it from Wordpress and host it as static site on S3 or serve it with Nginx on Heroku.

<img src="./wp-content/themes/vuewp/screenshot.png" width="500">

## Features
- [ES6](https://github.com/lukehoban/es6features) °\(^▿^)/°
- Component-based architecture with [Vue.js](https://vuejs.org/)
- Dead simple routing with [Vue-router](https://router.vuejs.org/en/essentials/getting-started.html)
- [Vuex](https://vuex.vuejs.org/en/intro.html) for state management
- [Webpack](https://webpack.js.org/) for module bundling
- [Stylus](http://stylus-lang.com/) for CSS preprocessing
- Simple asset pipeline with [gulp.js](https://gulpjs.com/)
- [Docker](https://www.docker.com/what-docker) for a deterministic and easy to set up development environment
- [Prerendering](https://github.com/chrisvfritz/prerender-spa-plugin) of the index route with client-side hydration
- [Code splitting](https://webpack.js.org/guides/code-splitting/) of below the fold content for faster page loads


## Development

- Clone this repo `git clone https://github.com/lyzs90/vuewp.git`
- Install the dependencies `npm install`
- Set up a [Docker](https://www.docker.com/community-edition) environment
- Start Wordpress and MySQL `docker-compose up -d`
- Obtain your docker container ip `docker-machine ip`
- Add your container ip to `.env.example` and rename to `.env`
- Access the Wordpress server at this url [http://container-ip:8000](http://container-ip:8000) and perform the famous 5-minute install
- Once Wordpress is set up, enable the theme
- For a better development experience, you should run `npm run dev` to run the Browsersync proxy server and you can access your site at http://localhost:8080, complete with live reloading and other cool stuff.

Tips: By default, vuewp will use Media with slug 'bg' as the background. It also uses permalinks of type 'Post name' to render Posts/Pages. So be sure to enable those settings if you want to use vuewp out of the box.

## Deployment

- Run the production build `npm run prod`
- Preview using a http server like [zeit/serve](https://github.com/zeit/serve) eg. `serve wp-content/themes/vuewp/dist`
- To use as a theme, simply copy the `vuewp` directory to your Wordpress themes i.e. `/var/www/html/wp-content/themes`
- For a headless setup, one option is to host the `dist` directory on [S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) as a static site.

## Recommended Plugins

- [Better REST API Featured Images](https://wordpress.org/plugins/better-rest-api-featured-images/)
- [ACF to Rest API](https://wordpress.org/plugins/acf-to-rest-api/)
- [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/)
- [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/)
- [Fakerpress](https://wordpress.org/plugins/fakerpress/)

## Credits
- Adapted from [bedakb/vuewp](https://github.com/bedakb/vuewp.git)
- Design inspired by [@Radium](https://dribbble.com/shots/3102550-Egloo)
- Image credits [@MUJI](http://www.muji.com/sg/)
