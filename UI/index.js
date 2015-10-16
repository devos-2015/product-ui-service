$(function () {
    function ProductViewModel(product){
        this.album = ko.observable(product.album);
        this.interpret = ko.observable(product.interpret);
        this.preis = ko.observable(product.preis);
    }

    function AppViewModel() {
        this.products = ko.observableArray();
        var self = this;
        this.add = function(product){
            self.products.push(product);
            self.newProduct(new ProductViewModel({}));
        };
        this.save = function(product){

        };
        this.remove = function(product){
            self.products.remove(product);
        };
        this.newProduct = ko.observable(new ProductViewModel({}));
    }

    var appViewModel = new AppViewModel();

    $.getJSON('/products', function (data) {
        data.forEach(x => appViewModel.products.push(new ProductViewModel(x)));
    });

    ko.applyBindings(appViewModel);

});
