---
layout: project
title:  "MovinUp"
date:   2014-10-14 02:00:00
categories: full-stack
short_description: A web application to help aid employee movement due to organizational growth
tags:
 - tag_type: Django
 - tag_type: jQuery
 - tag_type: BootStrap
 - tag_type: Angular
 - tag_type: CSS
 - tag_type: Leaflet
 - tag_type: ImageMagick
---
MovinUp was created as part of the senior design curriculum at NC State in partnership with Deutsche Bank, a class that I'm currently in.  It's been pretty fun!  Essentially it's a Django/Angular application that allows you to move people around to different desks on an architectural map of a building.


The map is tiled for Leaflet.js to display using wand's python bindings for ImageMagick using a script I wrote.  I wrote jQuery for dragging employees/seats onto and off of the map and grabbing information from Django using a RESTful API.


The schema of Django's model classes and a lot of the admin stuff were designed by my friends and teammates Matthew Frazier and Rebecca Schloe.


I've found that I enjoy the flow of working on single-page web apps (which this sort-of is), and I have become more familiar with jQuery as part of this process.