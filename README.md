# A System for Region Search and Exploration (VLDB'16)

## Introduction
This demo is equipped with two functions:

1. Region search.
2. Region exploration.

And here in this repository, only front end is included and some APIs available for calling.
To setting everthing up, please follow the instruction below. If your problems are still unsolved, shoot me with email: lawrencelauu@gmail.com.

## Using Region Search API
Firstly, Fill in the url in `.\js\region_search.js`:

```javascript
jQuery.post("YOUR_URL_HERE", query, showSearchResult);
```
    
Secondly, response with data as:

```javascript
data = {
    'bounds': {
        north: 1.3440514780783714, 
        south: 1.3087743219216286, 
        east: 103.82537567807832, 
        west: 103.79009852192156},
    'pois': [
        {
            'image_url': './pics/1.png',
            'poi_name': 'Neverland',
            'lat': 1.3,
            'lng': 103,
            'categories': ['Dance Clubs', 'Music Venues'],
            'description': 'With the ambitious vision of delivering a clubbing experience...'
        }
    ]
};
```

## Using Region Exploration API
Firstly, fill in the url in `.\js\region_explore.js`:

```javascript
jQuery.post("YOUR_URL_HERE", query, showExploreResult);
```
    
Secondly, response with some data as:

```javascript
data = {
        "topics": [tags, tags, tags] // could have more tags...
    };
```

And the `tags` should be like:

```javascript
tags = [
    {text: "...", size: 36},
    {text: "...", size: 18},
    {text: "...", size: 30},
    {text: "...", size: 11}
]
```

See `./js/tags.js` for the example.

## Test
To test the demo, you can uncomment the data example in `showSearchResult()` of `.\js\region_search.js` (or `showExploreResult()` of `.\js\region_explore.js`) and send queries as you want.
Sorry for no test modules.


## File Structure
```
./
├── css
│   ├── base.css
│   ├── default
│   │   ├── bootstrap.css
│   │   ├── bootstrap.css.map
│   │   ├── bootstrap.min.css
│   │   ├── bootstrap-theme.css
│   │   ├── bootstrap-theme.css.map
│   │   ├── bootstrap-theme.min.css
│   │   ├── iThing.css
│   │   ├── iThing-min.css
│   │   └── jquery-ui.min.css
│   └── fonts				// Icons of the panels.
│       ├── glyphicons-halflings-regular.eot
│       ├── glyphicons-halflings-regular.svg
│       ├── glyphicons-halflings-regular.ttf
│       ├── glyphicons-halflings-regular.woff
│       └── glyphicons-halflings-regular.woff2
├── index.html
├── js
│   ├── default				// Utilities (JQuery, Boostrap and Slider).
│   │   ├── bootstrap.js
│   │   ├── bootstrap.min.js
│   │   ├── jQDateRangeSlider-min.js
│   │   ├── jquery-1.11.3.min.js
│   │   └── jquery-ui.min.js
│   ├── init.js					// Initialization.
│   ├── map.js					// Map functions, like creating map and drawing region.
│   ├── region_explore.js		// Region explore.
│   ├── region_search.js		// Region search.
│   └── word_cloud				// Manipulating and configuring word cloud.
│       ├── d3.layout.cloud.js
│       ├── d3.min.js
│       ├── tags.js				// An example of topic data.
│       └── word-cloud.js
├── pics
│   └── topic_icon.png
└── README.md
```

