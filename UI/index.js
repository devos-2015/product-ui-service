$(function () {
    function ProductViewModel(product){
        this.album = ko.observable(product.album);
        this.interpret = ko.observable(product.interpret);
        this.price = ko.observable(product.price);
        this.id = product.id;
    }

    function AppViewModel() {
        this.products = ko.observableArray();
        var self = this;

        this.add = function(product){
            $.post(
            '/products',
            {
              album : product.album(),
              price : product.price(),
              interpret : product.interpret()
            },
            function(id){
              product.id = id;
              self.products.push(product);
              self.newProduct(new ProductViewModel({}));
            })
        };

        this.save = function(product){
          $.ajax(
            '/products/' + product.id,
            {
              method : 'PUT',
              data: {
                album : product.album(),
                price : product.price(),
                interpret : product.interpret()
              }
            });
        };

        this.remove = function(product){
          $.ajax(
            '/products/' + product.id,
            {
              method : 'DELETE'
            }
          ).done(() => self.products.remove(product));

        };
        this.newProduct = ko.observable(new ProductViewModel({}));
    }

    var appViewModel = new AppViewModel();

    $.getJSON('/products', function (data) {
        data.forEach(x => appViewModel.products.push(new ProductViewModel(x)));
    });

    ko.applyBindings(appViewModel);

});
