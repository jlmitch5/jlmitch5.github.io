/*global Backbone, jQuery*/

(function ($) {
  // Instantiate this viewState
  // this is used to store which post
  // currently has its details shown
  var viewState = new Backbone.Model();

  // This model stores the posts' details
  var PostDetail =  Backbone.Model.extend({
    parse: function (response) {
      return response.post;
    }
  });

  // This view renders the posts' details in
  // a nested list
  var PostDetailView = Backbone.View.extend({
    tagName: 'li',

    initialize: function () {
      this.$el.attr("class", "list-group-item");
      this.model.on('change', this.animate, this);
    },

    render: function () {
      this.$el.html(this.model.get('description'));
      return this;
    },
  });

  // This model stores the posts' title
  var Post = Backbone.Model.extend({});

  // This view renders the posts' title
  // Add does an AJAX call to get the 
  // post's details on click
  var PostView = Backbone.View.extend({
    tagName: 'a',

    initialize: function () {
      this.$el.attr("class", "list-group-item");
      this.$el.attr("id", this.model.get('id'));
    },

    events: {
      'click': 'expand'
    },

    render: function () {
      this.$el.html(this.model.get('title'));
      return this;
    },

    expand: function () {
      var postDetail = new PostDetail();
      var postDetailView = new PostDetailView({model: postDetail});
      var post_id = this.model.get('id');

      // This will be the post that was previously opened on the screen
      var currently_expanded_post_id = viewState.get('currently_expanded_post');

      // If the new post id is the same as the old one, don't
      // rerender it
      if (post_id !== currently_expanded_post_id) {
        // If they are not the same, remove the old one from the DOM
        $("#" + currently_expanded_post_id);
        $("#" + currently_expanded_post_id + " > ul").remove();

        // Make an AJAX call to get the new post's details
        postDetail.fetch({ url: "api/posts/" + post_id + ".json", success: function () {
          // Append a new list to the post element
          $("#" + post_id).append("<ul class='selected_post list-group' />");
          // Render the post's details inside this new list
          $(".selected_post").append(postDetailView.render().el);
          // Update the viewState model with the newly opened post
          viewState.set('currently_expanded_post', post_id);
        }});
      }
    },
  });

  // This is the collection of Post models as described
  // above
  var PostCollection = Backbone.Collection.extend({
    model: Post,

    parse: function (response) {
      return response.posts;
    }
  });

  // This is the view that iterates through all
  // posts and renders them.
  var PostCollectionView = Backbone.View.extend({
    tagName: 'div',

    initialize: function () {
      this.$el.attr("class", "list-group");
    },

    render: function () {
      this.collection.each(function (post) {
        var postView = new PostView({model: post});
        this.$el.append(postView.render().el);
      }, this);

      return this;
    }
  });


  // START:
  // instantiate a new PostCollection
  var postCollection = new PostCollection();
  // instantiate the PostCollection's view
  var postCollectionView = new PostCollectionView({collection: postCollection});
  // Make an AJAX call to GET the post list and render it
  postCollection.fetch({ url: "api/posts.json", success: function () {
    $("#posts").append(postCollectionView.render().el);
  }});

}(jQuery));