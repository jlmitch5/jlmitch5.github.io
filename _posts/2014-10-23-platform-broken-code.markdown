---
layout: post
title:  "My code is broken when I use a different platform"
date:   2014-10-23 22:50:00
categories: debugging
---
Hey everyone,

Today I did something I never thought I would do again...debug C code.  I have some not so fond memories of pointers and malloc, so when a good friend called me up and was explaining that her code was working okay on OSX, but not Linux, I wasn't very confident that I would be able to help.

After wasting time asking her what everything was doing, I started printing out different things on both platforms.  When I used a diff tool to check this out...I found out that I could tell the *method* was returning the same things on both, but it was being called a differnet number of times on each platform.

That led me to realize that the method that was calling the method I printed would be the next one to check.

So, in case anyone is reading this, I have a great strategy for you when dealing with platform problems.  Like Drake says, you must start from the bottom (ie: the method closest to the end) and work your way to the beginning until you find which methods return the same stuff.  Then, you will know the moment which the two platforms first differed, which is where the problems lie.  Drake refers to this as "here".

Your friend and coding wizard,

John
