---
layout: project
title:  "Verman Lab"
date:   2014-10-14 02:00:00
categories: full-stack
short_description: Visualization of the linux kernel's pci driver support
tags:
 - tag_type: Django
 - tag_type: jQuery
 - tag_type: BootStrap
 - tag_type: BASH
 - tag_type: CSS
---
Verman Lab was created for the Kernel Development and QA teams at Red Hat to have a simple way to check what driver compatibility has changed (either been removed or added) in different kernel versions of RHEL.


I started the project with a bash script which pulled all of the components that relate a machine's PCI driver support (kernels -> modules -> PCI aliases, or specific device ids).  Into a nice folder tree and then tar'd it, so that it could be uploaded and maintained in a relational database (which I developed the schema for).


The project ended up manifesting itself in two client-side applications:


1) A diff tool that look at the differences between two kernel versions. This provided the ability to zoom in and out from the module and device level, as well as some simple analytics (ie: Kernel A enables 512 devices that Kernel B doesn't enable).


2) A certification tool that could be use to find the earliest version of RHEL 6/7 that supports a specific piece of hardware.  This is useful so that the certification process (ie: Red Hat will support this device if you run into issues) in helping the team figure out where they should "start" their certification process.  If the certification process is started in a later version than when the device was actually enabled, Red Hat could have to redo their certification process if a customer ever needed to support that earlier version.


In addition to the server-side and client-side requirements illicitation, design, implementation and testing I did, I also created a RESTful API for both the database schema I created, as well as the upstream PCI.ids project (an exhaustive list of all PCI devices and their respective aliases).

[On GitHub](https://github.com/jlmitch5/vermanlab)
